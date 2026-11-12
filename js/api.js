const API_URL = "/api/calculate";

export async function calculateExpression(expression) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ expression })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.error || "Calculation failed");
    }

    return data.result;
}