
let gamePattern = [];
let UserClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"]
let start = false;
let level = 0;

$(document).keydown(function () { 
    if(!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    UserClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(UserClickedPattern.length-1);
})

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel] === UserClickedPattern[currentlevel]){
        if(gamePattern.length === UserClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function nextSequence(){
    UserClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    let selectedButton = $("#"+randomChosenColor);
    selectedButton.fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(sound){
    let audio = new Audio("sounds/"+sound+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    start = false;
    level = 0;
    gamePattern = [];
}