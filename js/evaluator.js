export function evaluateExpression(expression) {
    if (!expression || expression.length > 100) {
        throw new Error("عبارت نامعتبر است");
    }

    const tokens = expression.match(/\d*\.?\d+|[+\-*/%]/g);

    if (!tokens || tokens.join("") !== expression.replace(/\s/g, "")) {
        throw new Error("عبارت نامعتبر است");
    }

    let position = 0;

    function parseExpression() {
        let value = parseTerm();

        while (tokens[position] === "+" || tokens[position] === "-") {
            const operator = tokens[position++];

            const right = parseTerm();

            value = operator === "+"
                ? value + right
                : value - right;
        }

        return value;
    }

    function parseTerm() {
        let value = parseUnary();

        while (tokens[position] === "*" || tokens[position] === "/") {
            const operator = tokens[position++];

            const right = parseUnary();

            if (operator === "/" && right === 0) {
                throw new Error("تقسیم بر صفر امکان‌پذیر نیست");
            }

            value = operator === "*"
                ? value * right
                : value / right;
        }

        return value;
    }

    function parseUnary() {
        if (tokens[position] === "+") {
            position++;
            return parseUnary();
        }

        if (tokens[position] === "-") {
            position++;
            return -parseUnary();
        }

        return parsePercent();
    }

    function parsePercent() {
        let value = parseNumber();

        while (tokens[position] === "%") {
            position++;
            value /= 100;
        }

        return value;
    }

    function parseNumber() {
        const token = tokens[position++];

        if (!token || !/^\d*\.?\d+$/.test(token)) {
            throw new Error("عدد نامعتبر است");
        }

        return Number(token);
    }

    const result = parseExpression();

    if (position !== tokens.length || !Number.isFinite(result)) {
        throw new Error("عبارت نامعتبر است");
    }

    return Number(result.toPrecision(12));
}