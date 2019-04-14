from mongoengine import Document, StringField, ReferenceField, ListField
from flask_login import UserMixin
from werkzeug.security import generate_password_hash


class User(UserMixin, Document):
    user_name = StringField(required=True)
    first_name = StringField(required=False)
    last_name = StringField(required=False)
    password = StringField(required=True)
    group = ListField(required=False)

    def generate_password(self):
        return generate_password_hash(self.password)

    def username_is_duplicate(self, new_username):
        users = User.objects(user_name=new_username)
        if users:
            return True
        return False


class StudyGroup(Document):
    group_name = StringField(required=True)
    major = StringField(required=False)


class Cards(Document):
    question = StringField(required=True)
    answer = StringField(required=True)
    uuid = StringField(required=True)
    author = ReferenceField('User')
