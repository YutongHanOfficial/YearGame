let questions = [];
let score = 0;
let health = 100;
let currentQuestionIndex = 0;

// Load questions from JSON file
fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = shuffleQuestions(data);
        loadQuestion();
    })
    .catch(error => console.error("Error loading questions:", error));

document.addEventListener("DOMContentLoaded", () => {
    const yearSlider = document.getElementById("yearSlider");
    const yearInput = document.getElementById("yearInput");

    yearSlider.addEventListener("input", () => {
        yearInput.value = yearSlider.value;
    });

    yearInput.addEventListener("input", () => {
        let value = parseInt(yearInput.value);
        if (value < 1575) value = 1575;
        if (value > 2025) value = 2025;
        yearInput.value = value;
        yearSlider.value = value;
    });
});

function shuffleQuestions(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    if (health <= 0) {
        document.getElementById("event").innerText = "Game Over!";
        document.getElementById("yearSlider").style.display = "none";
        document.getElementById("yearInput").style.display = "none";
        document.querySelector("button").style.display = "none";
        return;
    }

    if (questions.length === 0) return;

    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    document.getElementById("event").innerText = questions[currentQuestionIndex].event;
}

function submitGuess() {
    const guess = parseInt(document.getElementById("yearInput").value);
    const correctYear = questions[currentQuestionIndex].year;
    const errorMargin = Math.abs(correctYear - guess);

    document.getElementById("feedback").innerHTML = `Correct Year: ${correctYear}<br>Margin of error: ${errorMargin} years`;

    health -= errorMargin;
    if (health < 0) health = 0;
    score += 1;

    document.getElementById("score").innerText = score;
    document.getElementById("health").innerText = health;

    document.getElementById("continueBtn").classList.remove("hidden");

    if (health <= 0) {
        document.getElementById("feedback").innerHTML += "<br>Game Over!";
        document.getElementById("continueBtn").innerText = "Restart";
        document.getElementById("continueBtn").onclick = () => location.reload();
    }
}

function nextQuestion() {
    document.getElementById("feedback").innerText = "";
    document.getElementById("continueBtn").classList.add("hidden");
    loadQuestion();
}
