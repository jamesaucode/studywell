(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(t,e,n){t.exports=n(53)},24:function(t,e,n){},48:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAGMAAABjAGzlHTDAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAJNQTFRF////20lJ32BA6lVV51VJ31VK4FxH41VO41VK5FZL41dN41hM41dL41ZN4VhM4VdL4lhM4ldL4lZN41dM4VhN41dN41ZM4ldN4ldL41dM4lhM4ldL4VdM4ldN4ldN4ldM4ldM4ldM4ldM4ldM4ldN4ldM4lZM4ldM4ldN4VdM4ldM4ldM4ldM4ldM4ldM4ldM4ldMUJ7q8gAAADB0Uk5TAAcIDBUYGSQtQUlRUlNUVVdYWVtdZGVqhIeXmKzByNPW2drb3N7j6vDy8/X7/P3+k+YqLAAAATRJREFUOMuFk9t2gjAQRQdBEapWobZcbdUWRJO6///r+kAWxEtX5m1mTnLO3EQG8+KyPpzPh7qMPXm0WdExWFfM7tKT7MKNXbKJnZ/uAPZ5FPp+GOV7gN10zM8boF2OgWULNPPhfQNUgf1lUAGN+WOyg1NyLzo5wa7XkQHJY1kJkImIzC5QPalbKrjMRKSANngGCFooRLwOjP7t90ZEZHncmlqg8ySGvclf0anIWnE1iD3EUkLeu1+AThMNHPtIDqXUEPXuQgFaA8pwRlDLAUKjaqX6Oei1CYRwkDP4coPQQ1N8ON8AXntAegOwKDbaUKQ2xShyrQGlLJII6rsy1WqlgB+rzLFRb7+oVa/0w2qU1erN54uIyOL4brfaOSz3uJ0L414559K61959OO7Tcx/v/+f/B/2YQtxaHV+FAAAAAElFTkSuQmCC"},49:function(t,e,n){},51:function(t,e,n){},53:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),o=n(17),s=n.n(o),r=(n(24),n(1)),c=n(2),l=n(4),u=n(3),d=n(5),m=(a.Component,n(7)),h=n.n(m),p=(n(28),function(t){function e(){return Object(r.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this.props,e=t.name,n=t.style;return t.clicked?i.a.createElement("button",{className:n.btnL+" btn--big"},e):i.a.createElement("button",{className:n.btnN+" btn--big"},e)}}]),e}(a.Component)),b=(n(48),function(t){function e(){var t,n;Object(r.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).state={editing:!0,focused:!1,questionInput:"",answerInput:"",id:h()()},n.onQuestionInputChange=function(t){n.setState({questionInput:t.target.value})},n.onAnswerInputChange=function(t){n.setState({answerInput:t.target.value})},n.handleKeyDown=function(t){switch(t.keyCode){case 13:n.handleSubmit(t)}},n.handleSubmit=function(t){n.props.onSubmit(n.state.questionInput,n.state.answerInput,n.state.id)},n.onAddButtonClick=function(t){console.log(t.keyCode+"DOWN!")},n.componentDidMount=function(){console.log("Editable new card mounted"),n.setState({questionInput:"New Question",answerInput:"New Answer"})},n}return Object(d.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this.props,e=t.style,n=t.onCancelClick;return i.a.createElement("div",{onKeyDown:this.handleKeyDown,tabIndex:"0",className:e.div+" big-card"},i.a.createElement("div",{className:e.question},i.a.createElement("input",{className:"big-title",value:this.state.questionInput,onChange:this.onQuestionInputChange,autoFocus:!0}),i.a.createElement("button",{className:"btn--dark btn--right",onClick:this.handleSubmit},"Add"),i.a.createElement("button",{className:"btn--top-right",onClick:n},i.a.createElement("span",{className:"no-background-color"},"X"))),i.a.createElement("input",{className:e.answer,value:this.state.answerInput,onChange:this.onAnswerInputChange}))}}]),e}(a.Component)),f=function(t){function e(){var t,n;Object(r.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).state={show:!1,answered:!1},n.onShowClick=function(t){n.setState(function(t){return{show:!t.show}})},n.handleKeyDown=function(t){switch(t.keyCode){case 32:console.log("Show answer!"),n.onShowClick(t)}},n}return Object(d.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this.props,e=t.question,n=t.answer,a=t.style,o=t.qnum;return i.a.createElement("div",{className:a.div+" big-card",tabIndex:"0",onKeyDown:this.handleKeyDown},i.a.createElement("div",{className:a.question},i.a.createElement("h3",{className:"big-title"},o+1,". ",e),this.state.show?i.a.createElement("button",{className:"btn--dark btn--right",onClick:this.onShowClick},"Hide"):i.a.createElement("button",{className:"btn--dark btn--right",onClick:this.onShowClick},"Show")),i.a.createElement("h3",{className:a.answer},this.state.show&&i.a.createElement("span",null,n)))}}]),e}(a.Component),k=function(t){function e(){return Object(r.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this.props,e=t.i,n=t.question,a=t.answer;return i.a.createElement("div",{className:"small-title"},i.a.createElement("p",{className:"tiny-title"},e,". ",n),i.a.createElement("p",{className:"tiny-text"},"Ans: ",a))}}]),e}(a.Component),g=function(t){function e(){var t,n;Object(r.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).state={card:{question:n.props.question,answer:n.props.answer,id:n.props.id},i:n.props.i,questionInput:"",answerInput:"",iInput:"",focused:!1},n.onQuestionInputChange=function(t){n.setState({card:{question:t.target.value,answer:n.props.answer,id:n.props.id}})},n.onAnswerInputChange=function(t){n.setState({card:{question:n.props.question,answer:t.target.value,id:n.props.id}})},n.onBlur=function(t){console.log(n.state),n.setState({focused:!1})},n.onFocus=function(t){n.setState({focused:!0})},n.handleEditClick=function(){n.props.onEditSubmit(n.state.card),n.onBlur()},n}return Object(d.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this.state.card,e=t.question,n=t.answer;t.i;return i.a.createElement("div",{className:"small-title"},i.a.createElement("div",{className:"small-title"},i.a.createElement("input",{onFocus:this.onFocus,onBlur:this.handleEditClick,value:e,onChange:this.onQuestionInputChange,className:"tiny-title"}),i.a.createElement("textarea",{onFocus:this.onFocus,onBlur:this.handleEditClick,value:n,onChange:this.onAnswerInputChange,name:"text"})))}}]),e}(a.Component),C=function(t){function e(){var t,n;Object(r.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).state={cardsInOrder:n.props.cardsInOrder,editing:!1,input:""},n.onEditClick=function(t){n.setState(function(t){return{editing:!t.editing}})},n}return Object(d.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this;console.log(this.state.input);var e=this.props.cardsInOrder;return i.a.createElement("div",{className:"cards"},this.state.editing?i.a.createElement("div",null,i.a.createElement("button",{onClick:this.onEditClick,className:"btn--dark btn--long"},"Finish Editing"),e.map(function(e){var n=e.question,a=e.answer,o=e.i,s=e.id;return i.a.createElement(g,{question:n,answer:a,i:o,id:s,onEditSubmit:t.props.onEditSubmit})})):i.a.createElement("div",null,i.a.createElement("button",{onClick:this.onEditClick,className:"btn--dark btn--long"},"Edit"),e.sort(function(t,e){return t.i>e.i}).map(function(t){var e=t.question,n=t.answer,a=t.i;return i.a.createElement(k,{question:e,answer:n,i:a})})))}}]),e}(a.Component),w=function(t){function e(){var t,n;Object(r.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).state={cards:[{question:"Pseudocode",answer:"a high-level description of the actions of a program or algorithm, using a mixture of English and informal programming language syntax",i:1,id:h()()},{question:"Algorithm",answer:"a step-by-step procedure for solving a problem",i:2,id:h()()},{question:"Flowchart",answer:"a diagram that shows step-by-step progression through a procedure using connecting lines and a set of symbols",i:3,id:h()()},{question:"This is a very long question. Yes, I make this question long to see if it fits well into the container",answer:"provide a computer or other machine with coded instructions for the automatic performance of a particular task",i:4,id:h()()},{question:"Your mom?",answer:"Fat",i:5,id:h()()}],current:{},darkMode:!0,leftBtnClicked:!1,rightBtnClicked:!1,collapse:!1,playing:!1,newCard:!1,dim:!1,qnum:0},n.handleShuffleClick=function(){n.onShuffleClick(),n.setState({qnum:0})},n.onShuffleClick=function(){console.log("Everyday I am shuffling");var t,e,a,i=n.state.cards;for(a=i.length-1;a>0;a--)t=Math.floor(Math.random()*(a+1)),e=i[a],i[a]=i[t],i[t]=e;n.setState({cardsRandomOrder:i})},n.onCollapseClick=function(t){n.setState(function(t){return{collapse:!t.collapse}})},n.onLastQuestionClick=function(t){n.state.qnum<=0?n.setState({qnum:n.state.cards.length-1}):n.setState(function(t){return{qnum:t.qnum-1}}),n.setState({rightBtnClicked:!1,leftBtnClicked:!0})},n.onNextQuestionClick=function(t){n.setState(function(t){return{qnum:(t.qnum+1)%n.state.cards.length,rightBtnClicked:!0,leftBtnClicked:!1}})},n.onModeClick=function(t){n.setState(function(t){return{darkMode:!t.darkMode}})},n.onEditSubmit=function(t){var e=t.question,a=t.answer,i=t.id;console.log(e,a,i),n.setState({cards:n.state.cards.map(function(t){return console.log(t),i===t.id?Object.assign({},t,{question:e,answer:a,id:i}):t})})},n.onAddQuestionClick=function(t){n.setState({newCard:!0})},n.onSubmit=function(t,e,a){console.log("submitting:"+t+e);var i={question:t,answer:e,id:a,i:n.state.cards.length+1};n.setState(function(t){return{cards:t.cards.concat(i)}}),n.onCancelClick()},n.onCancelClick=function(t){n.setState({newCard:!1})},n.onStartClick=function(t){n.setState(function(t){return{playing:!t.playing}})},n.handleKeyDown=function(t){if(n.state.playing)switch(t.keyCode){case 39:console.log("Next meme"),n.onNextQuestionClick(t);break;case 37:console.log("Previous meme"),n.onLastQuestionClick(t)}n.state.dim&&27===t.keyCode&&(console.log("Escaping from dim mode"),n.onDimClick(t))},n.onDimClickOff=function(t){!0===n.state.dim&&n.setState({dim:!1})},n.onDimClick=function(t){n.setState(function(t){return{dim:!t.dim}})},n}return Object(d.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this.state.cards,e=(this.state.cardsRandomOrder,this.state),n=e.collapse,a=e.qnum,o=e.darkMode,s=e.playing,r=e.newCard,c="dark-mode",l={};return o?(c="dark-mode",l={btnL:"btn--dark--next",btnN:"btn--dark--last",btn:"btn--dark",cards:"cards--dark",card:{div:"card--dark",question:"question--dark",answer:"answer--dark"}}):(c="light-mode",l={btnL:"btn--light--last",btnN:"btn--light--next",btn:"btn--light",cards:"cards--dark",card:{div:"card--light",question:"question--light",answer:"answer--light"}}),i.a.createElement("div",{tabIndex:"0",onKeyDown:this.onDimClickOff,className:c},this.state.dim&&i.a.createElement("div",{className:"dimmer"}),i.a.createElement("button",{className:l.btn,onClick:this.onModeClick},"Light mode / Dark mode"),n?i.a.createElement("button",{className:l.btn,onClick:this.onCollapseClick},"Hide all questions"):i.a.createElement("button",{className:l.btn,onClick:this.onCollapseClick},"Show all questions"),s?i.a.createElement("button",{className:l.btn,onClick:this.onStartClick},"Stop"):i.a.createElement("button",{className:l.btn,onClick:this.onStartClick},"Start"),i.a.createElement("button",{className:l.btn,onClick:this.handleShuffleClick},"Shuffle"),i.a.createElement("button",{onClick:this.onAddQuestionClick,className:l.btn},"Add Question"),i.a.createElement("button",{className:l.btn,onClick:this.onDimClick},"Dim the light"),r&&i.a.createElement(b,{style:l.card,onSubmit:this.onSubmit,onCancelClick:this.onCancelClick}),n&&i.a.createElement(C,{cardsInOrder:t,onEditSubmit:this.onEditSubmit}),s&&i.a.createElement("div",{tabIndex:"0",onKeyDown:this.handleKeyDown},i.a.createElement(f,{question:this.state.cards[a].question,answer:this.state.cards[a].answer,style:l.card,qnum:a}),i.a.createElement("div",{className:"btns"},i.a.createElement(p,{name:"\u2190 Previous",style:l,onClick:this.onLastQuestionClick,clicked:this.state.leftBtnClicked}),i.a.createElement(p,{name:"Next \u2192",style:l,onClick:this.onNextQuestionClick,clicked:this.state.rightBtnClicked}))),s&&i.a.createElement("div",{className:"answer-input-wrapper"},i.a.createElement("textarea",{className:"answer-input"})))}}]),e}(a.Component),E=(n(49),n(51),function(t){function e(){return Object(r.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(w,null))}}]),e}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[18,2,1]]]);
//# sourceMappingURL=main.b50701c3.chunk.js.map