
var gamePattern=[];
var userClickedPattern=[];
var buttonColours= ["red","blue","green","yellow"];
var flag=0;
var level=0;

$(document).keydown(function(){
  if(flag==0){
  nextSequence();
  $("h1").text("Level "+level);
  }
});


function nextSequence() {
  level++;
  userClickedPattern = [];


  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  flag=1;




}
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function playSound(color){
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  } ,100);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 1000);
      $("h1").text("Game Over, Press Any Key to Restart")
      startOver();

    }

}

function startOver(){
    level=0;
    gamePattern=[];
    flag=0;

}
