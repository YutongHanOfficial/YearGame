const questions = [
    { event: "World population reaches 4 billion.", year: 1974 },
    { event: "The 18th Amendment is passed, establishing Prohibition in the U.S.", year: 1919 },
    { event: "First man lands on the Moon.", year: 1969 }
];

let score = 0;
let lives = 5;
let currentQuestionIndex = 0;

document.addEventListener("DOMContentLoaded", loadQuestion);

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById("event").innerText = "Game Over!";
        document.getElementById("guess").style.display = "none";
        document.querySelector("button").style.display = "none";
        return;
    }

    document.getElementById("event").innerText = questions[currentQuestionIndex].event;
}

function submitGuess() {
    const guessInput = document.getElementById("guess");
    const feedback = document.getElementById("feedback");
    const continueBtn = document.getElementById("continueBtn");

    let guess = parseInt(guessInput.value);
    let correctYear = questions[currentQuestionIndex].year;

    if (isNaN(guess)) {
        feedback.innerText = "Please enter a valid year.";
        return;
    }

    let errorMargin = Math.abs(correctYear - guess);
    feedback.innerHTML = `Correct Year: ${correctYear}<br>Margin of error: ${errorMargin} years`;

    if (guess === correctYear) {
        score += 1;
    } else {
        lives -= 1;
    }

    document.getElementById("score").innerText = score;
    document.getElementById("lives").innerText = lives;

    guessInput.disabled = true;
    continueBtn.classList.remove("hidden");

    if (lives <= 0) {
        feedback.innerHTML += "<br>Game Over!";
        continueBtn.innerText = "Restart";
        continueBtn.onclick = () => location.reload();
    }
}

function nextQuestion() {
    document.getElementById("feedback").innerText = "";
    document.getElementById("guess").value = "";
    document.getElementById("guess").disabled = false;
    document.getElementById("continueBtn").classList.add("hidden");

    currentQuestionIndex++;
    loadQuestion();
}
