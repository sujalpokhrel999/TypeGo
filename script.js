const inputText = document.getElementById('TextInput');
const mistakeCounter = document.getElementById('mistakeCounter');
const textElement = document.getElementById('Text');
const timerElement = document.getElementById('timer');
let pointsCounter = document.getElementById('pointsCounterValue');
let num = 0; // Keeps track of the current character being compared
let mistakeNum = 0; // Tracks the number of mistakes
let points = 0; // Initialize points counter
let timeInSeconds = 30; // Set initial timer value in seconds
let remainingTime =0;
let userInputValue ='';
let wrapper = document.getElementById('wrapper');
let timerInterval;
const typedCorrectIndices = new Set();

const PracticeText = [
  'The quick brown fox jumps over the lazy dogs.',
  'In the bustling heart of the city, people hurriedly walk along the crowded streets, their minds occupied with the tasks of the day, as the vibrant colors of street art on nearby walls capture the attention of passersby.',
  'On a quiet evening, as the golden hues of the setting sun paint the sky, a gentle breeze sweeps across the fields, rustling the leaves of the trees and carrying the sweet scent of fresh flowers to those lucky enough to experience the serene beauty of nature.',
  'At the corner of the street, a small cafe with cozy lights and the inviting aroma of freshly brewed coffee draws in customers from all walks of life, offering a brief escape from the fast-paced world outside.',
  'As the clock strikes midnight, a solitary figure stands at the edge of the vast, silent lake, gazing out over the still waters, contemplating the mysteries of the universe under the watchful gaze of a thousand twinkling stars.'
];



















inputText.addEventListener('input', () => {
  const userInput = inputText.value; // Get the user's input
  const targetText = textElement.innerText; // Get the target text
  let resultHTML = ""; // Initialize result HTML

  for (let i = 0; i < targetText.length; i++) {
    if (i < userInput.length) {
      // Compare user input with target text
      if (userInput[i] === targetText[i]) {
        resultHTML += `<span class="correct">${targetText[i]}</span>`; // Correct character
        if (!typedCorrectIndices.has(i)) {
          if (userInput[i] !== ' ' && i === userInput.length - 1){
          points++; // Increment points only for the first correct typing of this character
          pointsCounter.innerHTML = points;
          typedCorrectIndices.add(i); // Mark this index as correctly typed
        }
      }
      } else {
        resultHTML += `<span class="incorrect">${targetText[i]}</span>`; // Incorrect character
        if (userInput[i] !== ' ' && i === userInput.length - 1) {
          mistakeNum++; // Increment mistakes only for the current character
          mistakeCounter.innerHTML = mistakeNum;
        }
      }
    } else {
      // Remaining characters
      resultHTML += `<span class="not-typed">${targetText[i]}</span>`;
    }
  }

  // Update the display
  textElement.innerHTML = resultHTML;

  // Check if the user has completed the sentence
  if (userInput === targetText) {
    remainingTime = 30 - timeInSeconds;
    timeInSeconds = 0;
    clearInterval(timerInterval); // Stop the timer
    storeTime();
    resultBox(); // Show the results box
  }
});










document.addEventListener('keydown', (event) => {
  if (event.key === ' '){
  
 
    return;
  }
});

































// Randomly select a sentence for practice
const randomNumber = Math.floor(Math.random() * PracticeText.length);
textElement.innerText = PracticeText[randomNumber];

















// Handle backspace events
inputText.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    points--;
    if (num > 0) num--;
    if (inputText.value[num] !== textElement.innerText[num] && mistakeNum > 0) {
      mistakeNum--;
      mistakeCounter.innerText = mistakeNum;
    }
  }
});












const metricValue = document.getElementById('metric-value');

let wpm = (pointsCounter / 5) / 0.5;




const container = document.getElementById('container');
const dashboard = document.getElementById('dashboard');
// Timer function

function startTimer(){
function updateTimer() {
  const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
  timerElement.textContent = `Timer- ${minutes}:${seconds}`;

  if (timeInSeconds > 0) {
    timeInSeconds--;
  } else {
    clearInterval(timerInterval); // Stop the timer when it reaches 0
    timerElement.textContent = "Time's up!";
     // Show the results box
     container.style.display="none";
     dashboard.style.display="block";
     resultBox();
  }
}
const timerInterval = setInterval(updateTimer, 1000);
}



let storedTime = ''; // To store remaining time

function storeTime() {
  storedTime = remainingTime; // Store the remaining time
  console.log("Time stored: ", storedTime); // Log stored time (just for demonstration)
}





// Refresh Button Functionality
function refresh() {
  location.reload();
}









const startToType = document.getElementById('startToType');
const clickMe = document.getElementById('ClickMe');
startToType.addEventListener('click',()=>{
  wrapper.style.display="flex";
  clickMe.style.display="none";
  startTimer();
  inputText.focus();
  console.log("clicked");
});



let timeOptions = document.querySelectorAll('.timeOption');

timeOptions.forEach((timeOption) => {
  timeOption.addEventListener('click', () => {
    // Remove 'active' class from all options
    timeOptions.forEach((option) => option.classList.remove('active'));
    
    // Add 'active' class to the clicked option
    timeOption.classList.add('active');
  });
  
});






document.querySelectorAll('.metric, .secondary-metric').forEach(element => {
  element.addEventListener('mouseenter', () => {
      element.style.transform = 'scale(1.02)';
      element.style.transition = 'transform 0.2s ease';
  });
  
  element.addEventListener('mouseleave', () => {
      element.style.transform = 'scale(1)';
  });
});

// // You can add functions here to update the values dynamically
// function updateMetrics(wpm, acc, raw, chars, consistency, time) {
//   document.querySelector('.wpm').textContent = wpm;
//   document.querySelector('.acc').textContent = acc + '%';
//   // Add more updates as needed
// }s



function calculateMetrics() {
  const totalTyped = textElement.innerText.replace(/ /g, '').length;
  const correctTyped = typedCorrectIndices.size; // Correct characters
  const rawWPM = (totalTyped / 5) / (30 / 60); // Based on raw input
  const accuracy = ((correctTyped / totalTyped) * 100).toFixed(2) || 0; // Avoid division by zero
  const consistency = Math.min((correctTyped / totalTyped) * 100, 100).toFixed(2) || 0;

  // Calculate final WPM based on correct words typed
  const wpm = (correctTyped / 5) / (30 / 60); // Correct words per minute

  console.log(`totalTyped = ${totalTyped}`);
  console.log(`Correct typed = ${correctTyped}`);
  console.log(`Raw = ${rawWPM}`);
  console.log(`Accuracy = ${accuracy}`);
  console.log(`Consisteny = ${consistency}`);
  console.log(`Wpm = ${wpm}`);
  console.log(remainingTime);
  // Update dashboard values
  document.getElementById('wpm').textContent = Math.round(wpm);
  document.getElementById('accuracy').textContent = `${accuracy}%`;
  document.getElementById('consistency').textContent = `${consistency}%`;
  document.getElementById('raw-wpm').textContent = Math.round(rawWPM);
  document.getElementById('characters').textContent = `${correctTyped}/${mistakeNum}`;
  if(remainingTime>0){
  document.getElementById('time-elapsed').textContent = `${remainingTime}s`;
  }else{
    document.getElementById('time-elapsed').textContent = `30s`;
  }
}

// Call this function when time runs out or the user finishes typing
function resultBox() {
  calculateMetrics();
  container.style.display = "none"; // Hide typing area
  dashboard.style.display = "block"; // Show dashboard
}



















