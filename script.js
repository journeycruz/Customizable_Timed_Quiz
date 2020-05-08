//Set the body to a variable
var body = document.body;
 
// set timer
var timer = document.querySelector(".fixedTime")
 
// Create variable for time
var secondsLeft = 75;
 
// create elements
var header = document.createElement("h1");
var paragraph = document.createElement("p");
var startButton = document.createElement("button");
 
/*var choiceOneButton = document.createElement("button");
var choiceTwoButton = document.createElement("button");
var choiceThreeButton = document.createElement("button");
var choiceFourButton = document.createElement("button"); */
 
// appending  initial elements
body.appendChild(header);
body.appendChild(paragraph);
body.appendChild(startButton);
// set attribute for elements
startButton.setAttribute("id", "start-button");
 
// create array for non question headers
var nonQuestionHeaders = ["Coding Quiz Challenge", "All done!", "Highscores"];
// create array for p tags before and after quiz loop
var paragraphs = ["Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!", " Your final scores is __."];
var nonChoiceButtons = ["Start Quiz", "Submit", "Go Back", "Clear Highscores"];
 
// set initial screen content
header.textContent = nonQuestionHeaders[0];
header.setAttribute("style", "margin:auto; width:50%; text-align:center; margin-top: 100px; padding: 6px;")
paragraph.textContent = paragraphs[0];
startButton.textContent = nonChoiceButtons[0];
 
 
 
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
       choices: ["commas", "curly brackets", "quotes", "parentheses"],
       answer: "parentheses"
   },
];
 
// **Functions**
 
// time function
function timeCounter() {
   var timerInterval = setInterval(function() {
       secondsLeft--;
       timer.textContent = "Time: " + secondsLeft + " second(s)";
 
       if (secondsLeft === 0) {
           clearInterval(timerInterval);
       }
   }, 1000);
};
 
// on click start button, start quiz
$("#start-button").on("click", function() {  
   startQuiz();
});
 
// start quiz function
function startQuiz() {
   timeCounter();
   $("p").hide();
   $("#start-button").hide();
 
   /*
   body.appendChild(choiceOneButton);
   body.appendChild(choiceTwoButton);
   body.appendChild(choiceThreeButton);
   body.appendChild(choiceFourButton);*/
   // for each question
   for (i = 0; i < questions.length; i++) {
       var selectedAnswer = "";
       currentQuestion = questions[i];
       console.log(i)
       console.log(currentQuestion);
       // set questions and answers
       header.textContent = currentQuestion;
       var currentAnswerChoices = answerChoices[i];
       console.log(currentAnswerChoices);
       var currentChoices = currentAnswerChoices.choices;
       var currentAnswer = currentAnswerChoices.answer;
       console.log("CHOICES: " + currentChoices + " ANSWER: " + currentAnswer);
       // for each choice, create and append button value
       for (i = 0; i < currentChoices.length; i++) {
           var currentChoice = currentChoices[i];
           var currentChoiceButton = document.createElement("button");
           body.appendChild(currentChoiceButton);
           currentChoiceButton.setAttribute("class", "choiceButton");
           currentChoiceButton.textContent = currentChoice;
       };
   };
};
