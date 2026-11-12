export class Calculator {
    constructor() {
        this.expression = "";
        this.justCalculated = false;
    }

    clear() {
        this.expression = "";
        this.justCalculated = false;
    }

    delete() {
        this.expression = this.expression.slice(0, -1);
        this.justCalculated = false;
    }

    append(value) {
        const operators = ["+", "-", "*", "/"];

        if (this.justCalculated) {
            if (operators.includes(value)) {
                this.justCalculated = false;
            } else {
                this.expression = "";
                this.justCalculated = false;
            }
        }

        if (/^[0-9]$/.test(value)) {
            this.expression += value;
            return;
        }

        if (value === ".") {
            const currentNumber = this.expression.split(/[+\-*/]/).pop();

            if (currentNumber.includes(".")) return;

            if (!currentNumber) {
                this.expression += "0.";
            } else {
                this.expression += ".";
            }

            return;
        }

        if (value === "%") {
            if (/[0-9)]$/.test(this.expression)) {
                this.expression += "%";
            }
            return;
        }

        if (operators.includes(value)) {
            if (!this.expression && value !== "-") return;

            if (/[+\-*/]$/.test(this.expression)) {
                this.expression = this.expression.slice(0, -1);
            }

            if (this.expression.endsWith("%")) {
                this.expression += value;
                return;
            }

            this.expression += value;
        }
    }

    toggleSign() {
        if (!this.expression) {
            this.expression = "-";
            return;
        }

        const match = this.expression.match(/(-?\d+(?:\.\d*)?)$/);

        if (!match) return;

        const number = match[0];
        const start = match.index;

        if (start > 0 && this.expression[start - 1] === "-") {
            const previous = this.expression[start - 2];

            if (previous === undefined || /[+\-*/]/.test(previous)) {
                this.expression =
                    this.expression.slice(0, start - 1) +
                    this.expression.slice(start);
                return;
            }
        }

        this.expression =
            this.expression.slice(0, start) +
            (number.startsWith("-") ? number.slice(1) : "-" + number);
    }

    setResult(value) {
        this.expression = String(value);
        this.justCalculated = true;
    }

    getDisplayExpression() {
        return this.expression
            .replaceAll("*", "×")
            .replaceAll("/", "÷")
            .replaceAll("-", "−");
    }
}