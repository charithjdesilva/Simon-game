var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var gameStatus = false;    //game has not satrted
var level = 0;
var clickCount = 0;

/* start the game with a key press */

$("html").keydown(function(event)
{
    if(!gameStatus)   //run only if game has not started
    {
        // console.log(String.fromCharCode(event.which));       //print out which key was pressed
        nextSequence();
        gameStatus = true;
    }
});

/* This function returns a random number between 0 and 3 */
function nextSequence()
{
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]; //selecting a random color
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
    console.log(level);
    userClickedPattern = [];
}

/* identifying the users color */
$(".btn").click(function()
{
    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern[userClickedPattern.length-1]);
    
});

/* Play sounds according to color */
function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3"); // color audio source
    audio.play();
}

/* annimate the button when user clicks it */
function animatePress(currentColor)
{
    // $("#"+currentColor).addClass("pressed").delay(100).queue(function(next){
    //     $(this).removeClass("pressed");
    //     next();
    // });
    
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100); 

    // console.log(currentColor);
}


/* check answer function */
function checkAnswer(currentLevel)
{
    console.log(gamePattern);
    console.log(userClickedPattern);
    // console.log(currentLevel);
    if(level == userClickedPattern.length)
    {
        console.log("finished");
        
        setTimeout(function(){
            nextSequence();
        }, 1000);
        clickCount = 0;
    }
    else
    {   
        // console.log(currentLevel);
        // console.log(gamePattern[clickCount]);
        if(currentLevel == gamePattern[clickCount])
        {
            console.log("Sucess");
        }
        else
        {
            console.log("Wrong");
            audio = new Audio("sounds/wrong.mp3"); // wrong audio source
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);    
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }
        clickCount++;
    }
}

/* game restart function */
function startOver()
{
    level = 0;
    gameStatus = false;

    gamePattern = [];
    userClickedPattern = [];
    clickCount = 0;
}