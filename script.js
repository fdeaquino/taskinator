var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');

var message =
  'Some say the world will end in 🔥, Some say in ice. From what I’ve tasted of desire, I hold with those who favor fire. But if it had to perish twice, I think I know enough of hate. To say that for destruction ice, Is also great, And would suffice.';
var words = message.split(' ');

function countdown() {
  var timeLeft = 5;

  // TODO: The setInterval() method: repeats a function after 1000 milliseconds
  var timeInterval = setInterval(function () {
    // TODO: The `if` statement: is a condition that allows the setInterval function to run after one second
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } // TODO: The `else if` statement: when the time is equal to one, 
    else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } // TODO: Add comments describing the functionality of the `else` statement:
    else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
      displayMessage();
    }
  }, 1000);
}

// Displays the message one word at a time
function displayMessage() {
  var wordCount = 0;

  // Uses the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var msgInterval = setInterval(function () {
    // If there are no more words left in the message
    if (words[wordCount] === undefined) {
      // Use `clearInterval()` to stop the timer
      clearInterval(msgInterval);
    } else {
      // Display one word of the message
      mainEl.textContent = words[wordCount];
      wordCount++;
    }
  }, 1000);
}

countdown();
