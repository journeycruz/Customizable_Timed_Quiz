localStorage.clear();

//Set the body to a variable
var body = document.body;

// set timer 
var timer = document.querySelector(".fixedTime")

// Create variable for time
var secondsLeft = 75;

var allScores = [];

// create elements
var header = document.createElement("h1");
var mainParagraph = document.createElement("p");
var initialsParagraph = document.createElement("p");
var resultParagraph = document.createElement("p");;
var startButton = document.createElement("button");
var submitButton = document.createElement("button");
var backButton = document.createElement("button");
var clearButton = document.createElement("button");
var initialsInput = document.createElement("input");
var br = document.createElement("br");
var highscoresList = document.createElement("ol");

// set attribute for elements
header.setAttribute("style", "margin:auto; width:50%; text-align:center; margin-top: 100px; padding: 6px;");
header.setAttribute("id", "header");
mainParagraph.setAttribute("id", "mainParagraph");
initialsParagraph.setAttribute("id", "initialsParagraph");
resultParagraph.setAttribute("id", "resultParagraph");
resultParagraph.setAttribute("style", "font-style:italic;");
startButton.setAttribute("id", "start-button");
submitButton.setAttribute("id", "submit-button");
backButton.setAttribute("id", "back-button");
clearButton.setAttribute("id", "clear-button");
initialsInput.setAttribute("id", "initialsInput");
br.setAttribute("id", "br");

allElementIds = ["header", "mainParagraph", "initialsParagraph", "resultParagraph", "start-button", "submit-button", "back-button", "clear-button", "initialsInput", "choiceButton1", "choiceButton2", "choiceButton3", "choiceButton0"];


// create array for non question headers
var nonQuestionHeaders = ["Coding Quiz Challenge", "All done!", "Highscores"];

// create array for p tags before and after quiz loop
var paragraphs = ["Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!", " Your final scores is ", "Enter Initials: "];

var nonChoiceButtons = ["Start Quiz", "Submit", "Go Back", "Clear Highscores"];

var results = ["Correct!", "Wrong!"];

// create  array for questions
var questions = ["Commonly used data types DO NOT include:", "The condition in an if / else statement is enclosed within:", "Arrays in JavaScript can be used to store ___.", "String values must be enclosed within ___ when being assigned to variables.", "A very useful tool used during development and debugging for printing content to the debugger is:"]

// create array of choices and answers
var answerChoices = [
    //Q1
    {
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    //Q2
    {
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    //Q3
    {
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    //Q4
    {
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "parentheses"
    },
    //Q5
    {
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },
];

// **** Functions ****

// first screen function - append and set initial element content
function introduction() {
    document.querySelector(".fixedTime").textContent = "Time: 0";
    body.appendChild(header);
    body.appendChild(mainParagraph);
    body.appendChild(startButton);
    header.textContent = nonQuestionHeaders[0];
    mainParagraph.textContent = paragraphs[0];
    startButton.textContent = nonChoiceButtons[0];
    $(startButton).show();
    $(backButton).hide();
    $(clearButton).hide();
    // on click start button, start quiz
    $("#start-button").on("click", function() {  
        startQuiz();
    });
};

// timer function

function timeCounter() {
    $(".fixedTime").show();
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            result = localStorage.getItem("result");
            score = localStorage.getItem("score");
            endQuiz(score, result);
        }
    }, 1000);
};

// start quiz function
function startQuiz() {
    localStorage.removeItem(score);
    localStorage.removeItem(result);
    var score = 0;
    var result = "";
    // start timer and hide intial screen contents
    timeCounter();
    $("#mainParagraph").hide();
    $("#start-button").hide();

    // initiate question counter
    var questionIndex = 0;
    // append and set initial questions and buttons 
    if (questionIndex == 0) {
        var currentQuestion = questions[questionIndex];
        // set questions and answers
        header.textContent = currentQuestion;
        var currentAnswerChoices = answerChoices[questionIndex];
        var currentChoices = currentAnswerChoices.choices;
        var currentAnswer = currentAnswerChoices.answer;
        // for each choice, create and append button value
        for (i = 0; i < currentChoices.length; i++) {
            var currentChoice = currentChoices[i];
            // create and append buttons with ids
            var currentChoiceButton = document.createElement("button");
            body.appendChild(currentChoiceButton);
            body.appendChild(br);
            currentChoiceButton.setAttribute("class", "choiceButton");
            var currentChoiceButtonId = "choiceButton" + i;
            currentChoiceButton.setAttribute("id", currentChoiceButtonId);
            currentChoiceButton.textContent = currentChoice;
        };
        questionIndex++;
    }
    // on click of any button, add to score / deduct time
    $(".choiceButton").on("click", function() {
        // compare answer and selection - add points if corret, deduct time if incorrect
        var selectedAnswer = $(this).text();
        var previousAnswerChoices = answerChoices[questionIndex - 1];
        var previousAnswer = previousAnswerChoices.answer;
        if (selectedAnswer == previousAnswer) {
            result = results[0];
            score += 20;
            window.localStorage.setItem('score', score);
            window.localStorage.setItem('result', result);
        } else {
            result = results[1];
            score += 0;
            window.localStorage.setItem('result', result);
            window.localStorage.setItem('score', score);
            secondsLeft -= 10;
        };

        // append question and set choices buttons until final question
        if (questions.length > questionIndex) {
            // set and append result paragraph
            showResult(result)
            var currentQuestion = questions[questionIndex];
            // set questions and answers
            header.textContent = currentQuestion;
            var currentAnswerChoices = answerChoices[questionIndex];
            var currentChoices = currentAnswerChoices.choices;
            var currentAnswer = currentAnswerChoices.answer;
            // for each choice, create and append button value
            for (i = 0; i < currentChoices.length; i++) {
                var currentChoice = currentChoices[i];
                var currentChoiceButtonId = "choiceButton" + i;
                document.getElementById("choiceButton" + i).textContent = currentChoice;
            };

        } else {
            endQuiz(score, result);
        }
        questionIndex++;
    }); 

};

// end quiz function - display score, prompt initials, and save score (sort descending)
function endQuiz(score, result) {
    secondsLeft = 1;
    // hide buttons
    $(".choiceButton").hide();
    body.appendChild(initialsParagraph);
    body.appendChild(initialsInput);
    body.appendChild(submitButton);
    $(submitButton).show();
    $(initialsInput).show();
    $(initialsParagraph).show();
    header.textContent = nonQuestionHeaders[1];
    mainParagraph.textContent = paragraphs[1] + score + ".";
    initialsParagraph.textContent = paragraphs[2];
    submitButton.textContent = nonChoiceButtons[1];
    $("#mainParagraph").show();

    // call after appending other elements
    showResult(result);

    //on click of submit, call view highscores
    var initials = "";

    $(submitButton).on("click", function() {
        initials = $("input").val();
        if (initials == "") {
            console.log("empty");
        } else {
            var currentScoreObj = {
                score: score,
                initials: initials
            };
            allScores.push(currentScoreObj);
            var allScoresSorted2 = allScores.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));

            viewHighScores();
        }

    })


}

// show result and hide after timeout
function showResult(result) {
    // set and append result paragrpah
    resultParagraph.textContent = result;
    body.appendChild(resultParagraph);
    // timeout
    $("#resultParagraph").show();
    setTimeout(function() {
        $('#resultParagraph').fadeOut('fast');
    }, 1000);
};


function viewHighScores() {
    $(".fixedTime").hide();
    $(submitButton).hide();
    $(initialsInput).hide();
    $(initialsParagraph).hide();
    header.textContent = nonQuestionHeaders[2];
    body.appendChild(backButton);
    body.appendChild(clearButton);
    $(backButton).show();
    $(clearButton).show();
    backButton.textContent = nonChoiceButtons[2];
    clearButton.textContent = nonChoiceButtons[3];

    $(backButton).on("click", function() {
        // remove all appended elements
        for (let i = 0; i < allElementIds.length; i++) {
            var currentId = allElementIds[i];
            $("#" + currentId).remove();
        }
        secondsLeft = 75;
        introduction();
    });
};

// intial screen
introduction();
