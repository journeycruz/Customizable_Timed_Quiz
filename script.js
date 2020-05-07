// Set the body to a variable
var body = document.body;

// Element variables
var timer = document.querySelector(".fixedTime")

// Create variable for time
var secondsLeft = 75;

// Create elements
var header = document.createElement("h1");
var paragraph = document.createElement("p");

// Append elements
body.appendChild(header);
body.appendChild(paragraph);

// Create header array


// Create paragraph array

// Set text
header.textContent = "TESTHEADER"
header.setAttribute("style", "margin:auto; width:50%; text-align:center; margin-top: 100px; padding: 6px; background: #eee;")

paragraph.textContent = "testpara";

// Functions
function timeCounter() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft + " second(s)";

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

timeCounter();
