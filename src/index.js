require('styles.css');
if (module.hot) {
  module.hot.accept(); // Accept updates for hot-reloaded modules
}
const body = document.body;

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
