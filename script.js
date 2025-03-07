const questions = [
    { event: "World population reaches 4 billion.", year: 1974 },
    { event: "The 18th Amendment is passed, establishing Prohibition in the U.S.", year: 1919 },
    { event: "First man lands on the Moon.", year: 1969 },
    { event: "The Berlin Wall falls.", year: 1989 },
    { event: "The first iPhone is released.", year: 2007 },
    { event: "Titanic sinks.", year: 1912 },
    { event: "End of World War II.", year: 1945 }
];

let score = 0;
let health = 100;
let currentQuestionIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    document.getElementById("yearSlider").addEventListener("input", updateSliderValue);
});

function shuffleQuestions() {
    return questions.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    if (health <= 0) {
        document.getElementById("event").innerText = "Game Over!";
        document.getElementById("yearSlider").style.display = "none";
        document.querySelector("button").style.display = "none";
        return;
    }

    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    document.getElementById("event").innerText = questions[currentQuestionIndex].event;
}

function updateSliderValue() {
    document.getElementById("yearValue").innerText = document.getElementById("yearSlider").value;
}

function submitGuess() {
    const guess = parseInt(document.getElementById("yearSlider").value);
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
