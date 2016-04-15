

	Template.colors.rendered = function(){
		r = Raphael("ColorBox",500,200);
		colormain();
		
	};
	 var colormain = function(){	
		 a = r.circle(50,50,20);
		 b = r.circle(100,50,20);
		 c = r.circle(150,50,20);
		 d = r.circle(200,50,20);
		 e = r.circle(250,50,20);
		 f = r.circle(300,50,20);
		 g = r.circle(350,50,20);
		
		 one = r.circle(50,50,20).attr({stroke: "black", fill: "red", "fill-opacity": .2});
		 two = r.circle(100,50,20).attr({stroke: "black", fill: "orange", "fill-opacity": .2});
		 three = r.circle(150,50,20).attr({stroke: "black", fill: "yellow", "fill-opacity": .2});
		 four = r.circle(200,50,20).attr({stroke: "black", fill: "green", "fill-opacity": .2});
		 five = r.circle(250,50,20).attr({stroke: "black", fill: "blue", "fill-opacity": .2});
		 six = r.circle(300,50,20).attr({stroke: "black", fill: "indigo", "fill-opacity": .2});
		 seven = r.circle(350,50,20).attr({stroke: "black", fill: "violet", "fill-opacity": .2});
		
		 check = [];
		
		 clicks = [];
		 counter = 0;
		
		 i = 0;
		 loop = setInterval(null,0);	
		
		button = 0;
		
		 anim = Raphael.animation({"fill-opacity":0},500/*,function(){this.remove();}*/);
		 clkd = Raphael.animation({"fill-opacity":1},700,function () {
					this.animate({"fill-opacity": .2}, 500);});
		
		 same = false;
		 levelnum = 1;
		 testValue = "clicked";
		 result = "";
		 enable(1);
		disable(2);
		disable(3);
		onclick();
		
	};
	var onclick = function(){
		/*red*/
		one.click(function(){
			//print();
			this.animate(clkd); 
			clicks[counter] = 1;
			mouse();});
			
		/*or*/	
		two.click(function (){
			//print();
			this.animate(clkd);
			clicks[counter] = 2;
			mouse();});
			
		/*ylow*/	
		three.click(function (){
		//print();
			this.animate(clkd); 
			clicks[counter] = 3;
			mouse();});
					
		//green		
		four.click(function(){
			this.animate(clkd); 
			clicks[counter] = 4;
			mouse();});
			
		//blue	
		five.click(function (){
			this.animate(clkd);
			clicks[counter] = 5;
			mouse();});
			
		//purple*
		six.click(function (){
			this.animate(clkd); 
			clicks[counter] = 6;
			mouse();});
			
		//violet*
		seven.click(function (){
			this.animate(clkd); 
			clicks[counter] = 7;
			mouse();});	
		
	};
	var mouse = function(){
			counter++;
			if(clicks.length === check.length){
				button++; 
				if(compare()==true){
					result = "Correct!";
					alert(result);
				}else{ result = "Wrong!"; alert(result);}
				 counter = 0;

				if(check.length==3){
				disable(1);
				enable(2);
				levelnum = 2;
				}else if(check.length==5){
					disable(2);
					enable(3);
					levelnum =3;
				}else if(check.length==10){
					disable(3);
				}

				check = [];
				
			}

		};

	var start = function(length,speed){
		i = 0;
		var k;
		counter = 0;
		clicks = [];
		for(k = 0;k<length;k++){
			check[k]=(parseInt(Math.random()*7)+1);
			//check[k] = 3;
		}
		loop = setInterval(auto,speed);	
		
	};

	var auto = function(){
		if(i<check.length){
		//switch(check[i]){
			
			
		//case(1):
			if(check[i]=== 1){
			a.attr({fill: "red", "fill-opacity": 1});
				a.animate(anim);
			
			}
			
			//case(2):
			if(check[i]=== 2){
			b.attr({fill: "orange", "fill-opacity": 1});
				b.animate(anim);
			
			}
			if(check[i] === 3){
			//case(3):
			c.attr({fill: "yellow", "fill-opacity": 1});
				c.animate(anim);
			
			}
		
			//case(4):
		if(check[i] === 4){
			d.attr({ fill: "green", "fill-opacity": 1})
				d.animate(anim);
		}
			//case(5):
		if(check[i] === 5){
			e.attr({ fill: "blue", "fill-opacity": 1})
				e.animate(anim);
			
		}
			//case(6):
		if(check[i] === 6){
			f.attr({ fill: "indigo", "fill-opacity": 1})
				f.animate(anim);
			
		}
			//case(7):
		if(check[i] === 7){
			g.attr({ fill: "violet", "fill-opacity": 1})
				g.animate(anim);
			
			}
			//default:*/
			
		i++;
		
		}
		else{
			clearInterval(loop);
		}
	};

	var compare = function(){
		if(check.length==clicks.length){
			for(var j=0;j<check.length;j++){
				same = Boolean((check[j])== clicks[j]);
			}
			
		}
		/*if(button==1){
			$("#level1").prop("disabled",true);
		}
		if(button==2){
			$("#level2").prop("disabled",true);
		}
		if(button==3){
			$("#level3").prop("disabled",true);
		}*/
		return same;
	};

	var disable = function(buttonNum){
		$(".level"+buttonNum).prop("disabled",true);
	};
	var enable = function(buttonNum){
		$(".level"+buttonNum).prop("disabled",false);
	}

	Template.colors.events({
		
		"click .check": function(event){

			event.preventDefault();
			//a = compare();
			//$(".result").empty();
			Session.set('testSession',testValue);
			//Mycoll.insert({
			//	text: "hallo"
			//});

		},
		"click .level1": function(event){
			event.preventDefault();
			start(3,1000);
			
			//Meteor.call('removeAllPosts');

		},
		"click .level2": function(event){
			event.preventDefault();
			start(5,800);
			
			//Meteor.call('removeAllPosts');

		},
		"click .level3": function(event){
			event.preventDefault();
			start(10,300);
			
			//Meteor.call('removeAllPosts');

		},
		"click .again": function(event){
			event.preventDefault();
			enable(1);
			disable(2);
			disable(3);

		}


	});

	Template.click.helpers({
		mycoll: function(){
			return Mycoll.find().fetch();
		},
		getsesh: function(){
			return Session.get('testSession');
		}
	})


/*
	function array(){
		$('.array').empty();
		$('.array').append("Clicked: "+clicks+" ");
		$('.array').append("Auto: "+check);
		
		results = compare();
		$('.array').append(" Equal?: "+results);
		clicks = [];
		counter = 0;
		
	}
*/

