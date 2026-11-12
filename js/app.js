import { Calculator } from "./calculator.js";
import { evaluateExpression } from "./evaluator.js";

const calculator = new Calculator();

const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const statusDisplay = document.getElementById("status");
const keypad = document.querySelector(".keypad");

function updateDisplay() {
    const expression = calculator.expression;

    if (!expression) {
        expressionDisplay.textContent = "";
        resultDisplay.textContent = "0";
        return;
    }

    let operatorIndex = -1;

    for (let i = expression.length - 1; i > 0; i--) {
        if (["+", "-", "*", "/"].includes(expression[i])) {
            operatorIndex = i;
            break;
        }
    }

    if (operatorIndex === -1) {
        expressionDisplay.textContent = "";
        resultDisplay.textContent = expression;
    } else {
        const history = expression.slice(0, operatorIndex + 1);
        const current = expression.slice(operatorIndex + 1);

        expressionDisplay.textContent = history
            .replaceAll("*", "×")
            .replaceAll("/", "÷")
            .replaceAll("-", "−");

        resultDisplay.textContent =
            current || expression.slice(0, operatorIndex);
    }
}
function calculate() {
    try {
        const originalExpression = calculator.expression;
        const result = evaluateExpression(originalExpression);

        calculator.setResult(result);

        expressionDisplay.textContent = originalExpression
            .replaceAll("*", "×")
            .replaceAll("/", "÷")
            .replaceAll("-", "−");

        resultDisplay.textContent = result;
        statusDisplay.textContent = "";

    } catch (error) {
        statusDisplay.textContent = error.message;
    }
}

keypad.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button || !keypad.contains(button)) return;

    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === "clear") {
        calculator.clear();
        resultDisplay.textContent = "0";
        statusDisplay.textContent = "";
    }
    else if (action === "delete") {
        calculator.delete();
    }
    else if (action === "sign") {
        calculator.toggleSign();
    }
    else if (action === "calculate") {
        calculate();
        return;
    }
    else if (value !== undefined) {
        calculator.append(value);
    }

    updateDisplay();
});

document.addEventListener("keydown", (event) => {
    if (/^[0-9.]$/.test(event.key)) {
        calculator.append(event.key);
    }
    else if (["+", "-", "*", "/"].includes(event.key)) {
        calculator.append(event.key);
    }
    else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
        return;
    }
    else if (event.key === "Backspace") {
        calculator.delete();
    }
    else if (event.key === "Escape") {
        calculator.clear();
        resultDisplay.textContent = "0";
        statusDisplay.textContent = "";
    }
    else if (event.key === "%") {
        calculator.append("%");
    }
    else {
        return;
    }

    updateDisplay();
});