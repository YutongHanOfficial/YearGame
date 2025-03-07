let questions = [];
let score = 0;
let health = 100;
let currentQuestionIndex = 0;

fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = shuffleQuestions(data);
    })
    .catch(error => console.error("Error loading questions:", error));

document.addEventListener("DOMContentLoaded", () => {
    const healthSlider = document.getElementById("startingHealth");
    const healthDisplay = document.getElementById("healthDisplay");

    healthSlider.addEventListener("input", () => {
        healthDisplay.innerText = `Health: ${healthSlider.value}`;
    });

    const yearSlider = document.getElementById("yearSlider");
    const yearInput = document.getElementById("yearInput");

    yearSlider.addEventListener("input", () => {
        yearInput.value = yearSlider.value;
    });

    yearInput.addEventListener("input", () => {
        let value = Math.min(2025, Math.max(1575, parseInt(yearInput.value)));
        yearInput.value = value;
        yearSlider.value = value;
    });
});

function startGame() {
    health = parseInt(document.getElementById("startingHealth").value);
    document.getElementById("health").innerText = health;
    document.getElementById("setup-screen").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
    loadQuestion();
}

function shuffleQuestions(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    if (health <= 0) {
        document.getElementById("event").innerText = "Game Over!";
        document.querySelector("button").innerText = "Restart";
        document.querySelector("button").onclick = () => location.reload();
        return;
    }

    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    document.getElementById("event").innerText = questions[currentQuestionIndex].event;
}

function submitGuess() {
    if (health <= 0) {
        return; // Prevents further interaction if health is already 0
    }

    const guess = parseInt(document.getElementById("yearInput").value);
    const correctYear = questions[currentQuestionIndex].year;
    const errorMargin = Math.abs(correctYear - guess);

    document.getElementById("feedback").innerText = `Correct Year: ${correctYear} | Error: ${errorMargin} years`;

    health -= errorMargin;
    health = Math.max(0, health);

    if (health > 0) {
        score += 1; // Only increase score if still alive
        document.getElementById("continueBtn").classList.remove("hidden");
    }

    document.getElementById("score").innerText = score;
    document.getElementById("health").innerText = health;

    if (health <= 0) {
        document.getElementById("event").innerText = "Game Over!";
        document.querySelector("button").innerText = "Restart";
        document.querySelector("button").onclick = () => location.reload();
        document.getElementById("continueBtn").classList.add("hidden"); // Hide continue button
    }
}

function nextQuestion() {
    document.getElementById("feedback").innerText = "";
    document.getElementById("continueBtn").classList.add("hidden");
    loadQuestion();
}
