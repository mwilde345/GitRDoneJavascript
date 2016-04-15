  Mycoll = new Mongo.Collection("mycoll");

if (Meteor.isClient) {
 
/*
Meteor.startup(function () {
  Mycoll.update({owner: Meteor.user()},
          { $set: {
            colorResult: "",
            createdAt: "",
            username: "",
            email: "",
            arrowclick: ""
          }
          });
});
*/

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.home.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.home.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.body.events({
    
  });
Template.body.helpers({
  text: function(){
        var key = Meteor.userId() ? AccountsTemplates.texts.navSignOut : AccountsTemplates.texts.navSignIn;
        return T9n.get(key, markIfMissing=false);
    },
  currentuser: function(){
    if(Meteor.userId()!=null){
    var currentEmail = Meteor.user().emails[0].address;
      return "Current User: "+currentEmail;
     }
  }
  });
Template.body.events({
  'click #doLogin': function(event){
        event.preventDefault();
        if (Meteor.userId())
            AccountsTemplates.logout();
        else
            AccountsTemplates.linkClick("signIn");
    }
});

Session.setDefault('currentGame',"colorGame");

Template.gamemenu.events({
  'click #arrowid': function(event){
    event.preventDefault();
    Session.set('currentGame',"arrowGame");
    console.log("working");
  }
});

Template.gamemenu.helpers({
  getsesh: function(){
    return Session.get('currentGame');
  }
});

Template.scores.helpers({
  mycollfunc: function(){

   return Mycoll.find({owner: Meteor.user()});
 //  return Mycoll.find({},{owner: Meteor.user()}).fetch();

  },
  settings: function(){
    return {
      fields: ['email','username','colorResult', 
      'arrowclick','createdAt']
    };
  },
  fields: function(){
    return {fields: [
      {key: 'username', label: 'Name'},
      {key: 'colorResult', label: 'Color Game'},
      {key: 'createdAt', label: 'Date'}
    ]};
  }
  
});
/*
Template.scores.events({
  "click .deleteme": function(event){
    event.preventDefault();
    console.log("removing");
    Meteor.call('removeAllPosts');
    console.log("removed");
  }
});*/
Template.user.helpers({
  getname: function(){
    console.log(Meteor.user().username);
    if(Meteor.user().username==null){
      return Meteor.user().emails[0].address;
    }else return Meteor.user().username;
  }
});

Template.tech.events({

  'click button': function() {
  var first = new Date();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("demo").innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "ajax_info.txt", true);
  xhttp.send();
}
});

Template.tech.rendered = function(){
    canvas = document.getElementById('myCanvas');//this relates to the canvas id call in our html file
    ctx = canvas.getContext('2d'); //give it 2d or 3d when using canvas
    img = document.createElement("img");
    img.src = "chicken.png";
    draw();
};

function draw(){  
  ctx.fillStyle = "rgb(250,250,250)";
  ctx.strokeStyle = "rgb(150,10,250)";
  ctx.fillRect(0,0,500,500);
  ctx.lineWidth = "5";
  ctx.moveTo(50,50);
  ctx.lineTo(450,50);
  ctx.stroke();
  
  
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(220,170,200,35);
  
  ctx.fillStyle = "rgb(255,98,150)";
  ctx.font = "italic small-caps bold 25px arial";
  ctx.textAlign= "center";
  ctx.fillText("NOW is the time...",250,35);
  
  gradient = ctx.createLinearGradient(0,0,myCanvas.width,0);
  gradient.addColorStop("0","yellow");
  gradient.addColorStop("0.5","rgba(255,0,0,.1)");
  gradient.addColorStop(".6","blue");
  gradient.addColorStop("0.7","rgba(255,255,0,.3)");
  gradient.addColorStop(".8","blue");
  gradient.addColorStop("0.9","rgba(255,0,255,.4)");
  gradient.addColorStop("1.0","blue");
  ctx.fillStyle = gradient;
  ctx.textAlign = "left";
  ctx.fillText("Eat More Chikin!",220,200);
  
  ctx.beginPath();
  circle(180,400,200);
  ctx.fill();
  
  
  //img = document.getElementById("img");
  
  ctx.drawImage(img,100,200);
  
} 


function circle(xcen, ycen, rad){ 
  ctx.arc(xcen,ycen,rad,0,2*Math.PI,false); 
  ctx.stroke();
}




}


  Router.route('/', {
      name: 'home',
      template: 'home'
  });
  Router.route('allgames',{
    name: 'games',
    template: 'gamemenu'
  });
  Router.route('arrowgame',{
    name: 'arrow',
    template: 'arrowgame'
  });
  Router.route('ingame',{
    name: 'ingame',
    template: 'startgame'
  });
  Router.route('video1');
  Router.route('video2');
  Router.route('video3');
  Router.route('mazegame');
  Router.route('scores');
  Router.route('tech');
  Router.route('videos');


 // Router.route('login');
 AccountsTemplates.configureRoute('signIn',{
  name:'signin',
  path: '/login',
  template: 'myLogin',
  redirect: '/',
 });

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);



if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

      removeAllPosts: function() {

        Mycoll.update({},
          { $unset: {
            colorResult: "",
            createdAt: "",
            username: "",
            email: "",
            arrowclick: ""
          }
          });
      },
      removeValue: function(){
        return Mycoll.remove({},{owner: Meteor.user()});
      },
      insertStuff: function(){
          Mycoll.update({owner: Meteor.user()},
          { $set:
            {
              colorResult: ("Level "+levelnum+": "+result),
              createdAt: new Date(),
              //owner: Meteor.user(),
              username: Meteor.user().username,
              email: Meteor.user().emails[0].address,
              arrowclick: clicknum
            }       
         });
      }

    });
  });

}
