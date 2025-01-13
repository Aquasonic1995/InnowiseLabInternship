require('./styles.css');
if (module.hot) {
  module.hot.accept(); // Accept updates for hot-reloaded modules
}
const body = document.body;
const display = document.getElementById('display');
const clear = document.getElementById('clear');
const orangeButton = document.getElementById('orangeButton');
const purpleButton = document.getElementById('purpleButton');
const colorButton = document.getElementById('colorButton');

// Event listener for Light Theme button
orangeButton.addEventListener('click', () => {
  body.className = 'orange-theme';
});

// Event listener for Dark Theme button
purpleButton.addEventListener('click', () => {
  body.className = 'purple-theme';
});

// Event listener for Custom Theme button
colorButton.addEventListener('click', () => {
  body.className = 'color-theme';
});

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent; // Get the value from the button
    addToDisplay(value); // Call addToDisplay with the button's value
    console.log(value);
  });
});
function addToDisplay(input) {
  display.value += input; // Append input to the display
}
clear.addEventListener('click', () => {
  clearDisplay(); // Call clearDisplay when clicked
});

function clearDisplay() {
  display.value = '';
}
