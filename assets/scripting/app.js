$(document).ready(function(){


//This code will run as soon as the page loads
// provides click event on the answers
window.onload = setClickItems();

function setClickItems() {
//sets the event action..
  $(".list-group-item").on("click", checkAnswer);

};

//function(){

var array1 = [];
array1[0]	= ["Who is Donald Duck?",["Disney fowl", "Bank Robber", "Race Driver"],0];
array1[1] 	= ["Where is the moon?",["Near Uranus", "In orbit around the earth"], 1];
array1[2]	= ["How many gallons in a barrel of oil?",["9", "400", "55"],2];
array1[3] 	= ["Red or White?",["Red", "White"],0];
array1[4]	= ["Favorite Beer",["Bud Light", "Negra Modelo", "PBR"],1];
array1[5] 	= ["How many licks to get to the center of a tootsi pop?",["1", "2", "3"],2];

//   	alert($(this).data("answer"));
//   });
var timeOutID;
var intervalID;
var showTrivia;
var startID;
var numRights = 0;
var numWrongs = 0;
var gameGoing = true;
var globalQuestionNum = 0;
// timing variables
var maxLength = 8;
// fcn checkAnswer
// 1. increments counters for right and wrong answers
// 2. pauses the game.
// 

// sets teh diplay of the max length
$("#maxLength").html(maxLength);
function checkAnswer(){
	var restartID ;
	console.log("checking answer");
	 clearTimeout(timeOutID);
	 clearInterval(intervalID);

	 // gets the right answer index and the array index which are part of the LI tags for the UL
	 // var holdAnswerInfo =  $(this).data("answer");
	 var selectedAnswer = $(this).data("answer");
		if(selectedAnswer === showTrivia.correctAnswer){
			numRights++;
			$("#answerResult").html("<b>Congrats....you picked the Correctd Answer</b>");
		} else {
			numWrongs++;
			$("#answerResult").html("<b>Oh No..that was Incorrect!. The correct answer is: '" + array1[globalQuestionNum][1][showTrivia.correctAnswer] +"'.");

		}// end if

	//restarts the start fcn after 1500 miliseconds
	restartID = setTimeout(timeController.start,1500);

}//end  function 


var timeController = {

	time: maxLength,
	numTurns: 0,

	start: function(){
		// // starts the game
		console.log("start");
		// resets time to 0
		// starts the interval which increments every second
		// after n seconds, runs setTimeout which runs timeout. Timemout clears the intervalID from
		// the setinterval  which 
		if (gameGoing){
			timeController.time=maxLength;
			intervalID = setInterval(timeController.timeCount,1000);
			timeOutID = setTimeout(timeController.timeOut, maxLength * 1000);
		}
		// starts the timeing contorls.
		timeController.controlGame();

	}, // end start fcn

	controlGame: function(){
		console.log("control game");
		// passes the intergerNumber for the array of questions/answers..
		// console.log(timeController.numTurns + " " + array1.length);
		// the globalQuestionNum is used to keep track of the array between functions.
		globalQuestionNum = timeController.numTurns;
		if (timeController.numTurns < array1.length){
			if (timeController.numTurns === 0){
				$("#answerResult").html("<b>First Question!!</b>");
			} else {
				$("#answerResult").html("<b>Next Question!!</b>");

			}
			$("#numQuestion").html(timeController.numTurns  + 1);
			$("#maxQuestions").html(array1.length);
			// call displayInfo which shows the quesions and sanswers and sets the correct #.
		 	displayInfo(timeController.numTurns);
			timeController.numTurns++;
		 } else {
		 	// stops the intervals and timeout
			console.log("stoping")
			 clearTimeout(timeOutID);
			 clearInterval(intervalID);
			 // shows final results
			 displayFinale()
			$("#answerResult").html("<b><div id='restartGame'>Game Over. Click to Restart</div></b>");
			timeController.numTurns =0;
			// creats click objec to restart the next game.
			$("#restartGame").on("click", timeController.start);
		}// end 
	},// end fcn displayAnswers

	pause: function(){
		gameGoing = false;
	},
	timeOut: function(){
			// stopsp the increment every second when out of time and then automatically retarts
			// re-starts it
			console.log("running timeout");
			clearInterval(intervalID);
			numWrongs++;
			$("#answerResult").html("<b>Sorry..you ran out of Time!</b>");
			startID = setTimeout(timeController.start,1500);
	}, // end timeout fcn

	timeCount: function(){
		// derements the time counter (every second based upon setInterval(tiemCount))
		// and invokes the displayTimeRemaining 
		 timeController.time--;
		var displayTimeRemaining = timeController.displayTimeRemaining(timeController.time);

		// displays the time in the div
		$("#timeRemaining").html(displayTimeRemaining);

	}, // end timeCount

	displayTimeRemaining: function(t){
		var minutes = Math.floor(t / 60);
	    var seconds = t - (minutes * 60);

	    if (seconds < 10) {
	      seconds = "0" + seconds;
	    }

	    if (minutes === 0) {
	      minutes = "00";
	    }
	    else if (minutes < 10) {
	      minutes = "0" + minutes;
	    }

	    return minutes + ":" + seconds;

	}// end fcn displayTimeRemaining

} // end timeController




// constructor for question/ansser object
var Trivia = function(passArray){
  holdArray 	= passArray;
  this.answerArray	= [];
  this.question		= "";
  this.correctAnswer= 0;


	this.init = function(){
	this.question 		= holdArray[0];
	this.correctAnswer 	= holdArray[2];
	this.answerArray	= holdArray[1];

	}// end init
}// end Trivia Object


function displayInfo(passQuestionNum){

// Creates showTrivia object basedd upon passed array
showTrivia = new Trivia(array1[passQuestionNum]);

// variable for the LI

var listItems = "";
showTrivia.init();

// another way of initializing
//var showTri'ia = new Trivia'>+s
//showTrivia.init(array1);

$("#question").html(showTrivia.question);
		// loops thru array and crates list of answers
	for (var key_name in showTrivia.answerArray){
		listItems = listItems + "<li id='"+key_name+"' class='list-group-item' data-answer='"+ key_name + "'>"+showTrivia.answerArray[key_name]+"</li>";
	} // end for
 $("ul").html(listItems);
 setClickItems()
// $(".list-group-item").on("click", checkAnswer);
} // end displayInfo

function displayFinale(){
// displays the results of the game.
$("#numQuestion").html("No More!!");
$("#question").html("<b>Game Results</b>");
var resultLineOne = "<li class='list-group-item'>Number of Rights: " + numRights + "</li>";
var resultLineTwo = "<li class='list-group-item'>Number of Wrongs: " + numWrongs + "</li>";
 $("ul").html(resultLineOne+resultLineTwo);

}
// starts the game...
timeController.start();

});//end docuent ready