from uuid import uuid1
from flask import Flask, request, jsonify, url_for
from flask_restful import Resource, Api
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from mongoengine import connect, Document
from werkzeug.security import generate_password_hash, check_password_hash
from models.models import User, StudyGroup, Cards

app = Flask(__name__)
app.config["MONGO_DBNAME"] = 'myDatabase'
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
app.secret_key = "VERY SECRET"
api = Api(app)
login = LoginManager(app)
connect("myDatabase")

login.init_app(app)


@login.user_loader
def load_user(user_id):
    """ Function from user_loader to check user session """
    return User.objects(pk=user_id).first()


class Login(Resource):
    """ Endpoints for user login """

    def post(self):
        """ Post request when user login """
        user_name_input = request.json['user_name']
        password_input = request.json['password']
        if not user_name_input.strip():
            return{"message": "Please enter username"}
        try:
            user = User.objects.get(user_name=user_name_input)
        except:
            return {"message": 'User {} does not exist!'.format(user_name_input)}, 401
        if user:
            if check_password_hash(user['password'], password_input):
                login_user(user)
                return {'message': 'login succesful'}, 200
            return {"message": "Password is incorrect!"}, 401
        # Checks the database to see if password matches
        return {"message": "User {} does not exist!".format(user_name_input)}, 401


class Logout(Resource):
    """ The user logout endpoint """
    @login_required
    def get(self):
        name = current_user.user_name
        logout_user()
        return name + " is logged out."


class Register(Resource):
    """ The endpoints for user registration """

    def post(self):
        new_user_name = request.json['user_name']
        new_password = request.json['password']
        new_first_name = request.json.get('first_name')
        new_last_name = request.json.get('last_name')
        hashed_password = generate_password_hash(new_password)
        if User.username_is_duplicate(User, new_user_name):
            return {"message": "Username already exist"}
        new_user = User(user_name=new_user_name, password=hashed_password,
                        first_name=new_first_name, last_name=new_last_name).save()
        return {"message": "Registration successful for user " + new_user.user_name}

    @login_required
    def put(self):
        new_user_name = request.json.get('user_name')
        password_input = request.json['password']
        new_first_name = request.json.get('first_name')
        new_last_name = request.json.get('last_name')
        if not check_password_hash(current_user.password, password_input):
            return {"message": "Incorrect password"}, 401
        if new_user_name != current_user.user_name:
            if User.username_is_duplicate(User, new_user_name):
                return {"message": "Username already exist"}, 401
        else:
            current_user.update(first_name=new_first_name,
                                last_name=new_last_name, user_name=new_user_name)
            return {"message": "User information updated"}, 200


class checkAuth(Resource):
    """ Endpoints for checking if user session exist or not"""
    """ It should return success message if the user is authenticated.  """
    @login_required
    def get(self):
        return {"user_name": current_user.user_name, "first_name": current_user.first_name, "last_name": current_user.last_name, "groups": [StudyGroup.objects.get(id=group_id).group_name for group_id in current_user.group]}
    # flask-login sends a default message if unauthorized.


class Groups(Resource):
    def get(self):
        groups = StudyGroup.objects
        groups_list = [{"group_name": g.group_name, "major": g.major, "id": str(
            g.id), "members": [user.user_name for user in User.objects(group=g.id)]} for g in groups]

        return groups_list, 200

    def post(self):
        new_group_name = request.json['group_name']
        new_major = request.json.get('major')

        try:
            new_group = StudyGroup(group_name=new_group_name,
                                   major=new_major).save()
            return {"group_name": new_group_name, "major": new_major}, 200
        except:
            return {"message": "Could not create this group."}, 401


class Group(Resource):
    # Get the specific group's members
    def get(self, group):
        target_group = StudyGroup.objects(group_name=group).first()
        members = [user.user_name for user in User.objects(
            group=target_group.id)]
        return members, 200


class JoinGroup(Resource):
    @login_required
    def post(self):
        name = request.json.get('name')
        group_to_join = StudyGroup.objects.get(group_name=name)
        copy_current_user = current_user
        copy_current_user.group.append(group_to_join.id)
        current_user.update(group=copy_current_user.group)
        return {"message": "Joined group {}".format(group_to_join.group_name)}


class FlashCardList(Resource):
    @login_required
    def get(self):
        cards = Cards.objects(author=current_user.id)
        # return the cards, in object form
        cards_json = [{'question': card.question,
            'answer': card.answer, 'uuid': card.uuid} for card in cards]
        return cards_json

    @login_required
    def post(self):
        new_question = request.json['question']
        new_answer = request.json['answer']
        new_id = str(uuid1())
        new_card = Cards(question=new_question, answer=new_answer,
                         author=current_user.id, uuid=new_id).save()
        # Inserting document into the collections
        result = {'question': new_card['question'],
                  'answer': new_card['answer'],
                  'id': new_card['uuid'],
                  'message': 'A new card has been successfully added.'
                  }
        return jsonify(result)

    @login_required
    def delete(self):
        id_to_delete = request.json['uuid']
        try:
            card = Cards.objects.get(uuid=str(id_to_delete))
        except:
            return {"message": "The card you wanted to delete doesn't exist."}
        else:
            card.delete()
            return {"message": "Card successfully deleted"}

    @login_required
    def put(self):
        # Using .get method so that it is optional, it returns none if the key was not set.
        id_to_update = request.json['uuid']
        question_from_request = request.json.get('question')
        answer_from_request = request.json.get('answer')
        try:
            card = Cards.objects.get(uuid=str(id_to_update))
        except:
            return {"message": "The card you wanted to update doesn't exist."}, 400
        else:
            new_question = question_from_request if question_from_request else card.question
            new_answer = answer_from_request if answer_from_request else card.answer
            card.update(question=new_question, answer=new_answer)
            return {"message": "Card update successful!", "question": new_question, "answer": new_answer, 'uuid': card.uuid}, 200



# Path = localhost:5000/
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(checkAuth, '/check')
api.add_resource(FlashCardList, '/cards')
api.add_resource(Groups, "/groups")
api.add_resource(Group, "/groups/<string:group>")
api.add_resource(JoinGroup, "/group/join")

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="127.0.0.1")
