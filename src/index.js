require('./styles.css');
if (module.hot) {
  module.hot.accept(); // Accept updates for hot-reloaded modules
}
const body = document.body;

const orangeButton = document.getElementById('orangeButton');
const purpleButton = document.getElementById('purpleButton');
const neonButton = document.getElementById('neonButton');

// Event listener for Light Theme button
orangeButton.addEventListener('click', () => {
  body.className = 'orange-theme';
});

// Event listener for Dark Theme button
purpleButton.addEventListener('click', () => {
  body.className = 'purple-theme';
});

// Event listener for Custom Theme button
neonButton.addEventListener('click', () => {
  body.className = 'neon-theme';
});
