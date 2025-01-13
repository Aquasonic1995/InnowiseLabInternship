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
const modal = document.getElementById('modal');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const result = document.getElementById('result');
const percent = document.getElementById('percent');
let currentOperator = null;
let previousValue = null;
let isOperation = false;
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

digits.forEach((digit) => {
  digit.addEventListener('click', () => {
    if (isOperation === true) {
      isOperation = false;
      display.value = '';
    }
    const value = digit.textContent; // Get the value from the button
    addToDisplay(value); // Call addToDisplay with the button's value
  });
});

function addToDisplay(input) {
  if (display.value.length < 8) {
    // Check if the current input length is less than 7
    display.value += input; // Append the input to the display
  }
  console.log(display.value);
}

clear.addEventListener('click', () => {
  clearDisplay(); // Call clearDisplay when clicked
});

function modalOperation() {
  display.value = display.value * -1;
}

modal.addEventListener('click', () => {
  modalOperation();
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    const operatorValue = operator.textContent.trim(); // Get the operator (+, -, *, /)
    if (isOperation === true) {
      isOperation = false;
      currentOperator = null;
      previousValue = null;
    }

    if (previousValue === null) {
      // Store the current display value and operator if no operation is pending
      previousValue = parseFloat(display.value);
      currentOperator = operatorValue;
      isOperation = true;
    } else if (currentOperator) {
      // Perform the operation if one is already pending
      const result = performOperation(previousValue, parseFloat(display.value), currentOperator);
      display.value = result; // Show the result
      previousValue = result; // Update the previous value for chaining operations
      currentOperator = operatorValue; // Update to the new operator
    }
  });
});

function performOperation(a, b, operator) {
  let result;
  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = b !== 0 ? a / b : 'Error'; // Avoid division by zero
      break;
    default:
      result = b;
  }

  // If the result is not "Error", trim it to 8 characters
  if (result !== 'Error') {
    result = trimResult(result);
  }
  console.log(result);
  return result;
}

// If the result is not "Error", trim it to 8 characters

function trimResult(value) {
  if (typeof value === 'number') {
    const stringValue = value.toString();
    if (stringValue.length > 8) {
      // Limit to 8 characters with rounding
      return parseFloat(value.toPrecision(8));
    }
  }
  return value; // Return as is if less than 8 characters
}

result.addEventListener('click', () => {
  if (currentOperator && previousValue !== null && display.value !== '') {
    // Perform the operation with the stored values
    const currentValue = parseFloat(display.value);
    const resultValue = performOperation(previousValue, currentValue, currentOperator);
    display.value = resultValue; // Update the display with the result

    // Reset operator and previous value for a fresh start
    currentOperator = null;
    previousValue = null;
  }
});

percent.addEventListener('click', () => {
  if (isOperation) {
    isOperation = false;
    currentOperator = null;
    previousValue = null;
  }
  if (currentOperator && previousValue !== null) {
    // If an operator is active, calculate percentage relative to previousValue
    const currentValue = parseFloat(display.value);
    const percentageValue = (previousValue * currentValue) / 100;
    display.value = percentageValue; // Show the calculated percentage
  } else if (display.value !== '') {
    // Standalone percentage: Convert current value to a percentage
    const currentValue = parseFloat(display.value);
    console.log(currentValue);
    display.value = currentValue / 100;
  }
});

function clearDisplay() {
  display.value = '';
  currentOperator = null; // Reset operator
  previousValue = null; // Reset previous value
}
