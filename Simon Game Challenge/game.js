
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var gamePattern = [];
var level=0;
//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);
  playSound(userChosenColour);
 var n= userClickedPattern.length-1;
      checkAnswer(n);
});

function nextSequence() {
    userClickedPattern=[];
 level++;
 $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColour);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  animatePress(name);
}
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed');
        //....and whatever else you need to do
}, 100);
}
$("body").keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});
function checkAnswer(currentLevel) {
if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
}
else{
    console.log("error");
    var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass('game-over');
    //....and whatever else you need to do
}, 100);
$("#level-title").text("Game Over, Press Any Key to Restart");
startOver();
}


}
function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}
