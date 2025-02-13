// Initial setup for the game
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const coinCountElement = document.getElementById('coin-count');
const healthCountElement = document.getElementById('health-count');
const economicsQuestionElement = document.getElementById('economics-question');
const answerOptions = document.getElementById('answer-options');
const gameOverElement = document.getElementById('game-over');
const gameInfo = document.getElementById('game-info');

let coins = 0;
let health = 100;
let zombies = [];
let questions = [];
let currentQuestionIndex = 0;
let gameInterval;
canvas.width = 800;
canvas.height = 600;

// Zombie object
class Zombie {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.speed = 1;
    }

    move() {
        this.y += this.speed;
    }

    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Question data (example)
const economicQuestions = [
    {
        question: "What is scarcity?",
        options: ["A) Unlimited resources", "B) Limited resources", "C) Unlimited needs", "D) More money than needed"],
        correctAnswer: 'b'
    },
    {
        question: "What does GDP stand for?",
        options: ["A) General Demand Price", "B) Gross Domestic Product", "C) Global Debt Policy", "D) Government Deficit"],
        correctAnswer: 'b'
    },
    // More questions can be added here...
];

// Start the game
function startGame() {
    coins = 0;
    health = 100;
    zombies = [];
    currentQuestionIndex = 0;
    gameInterval = setInterval(gameLoop, 1000 / 60);
    spawnZombie();
    askQuestion();
    answerOptions.classList.remove('hidden');
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and move zombies
    for (let i = 0; i < zombies.length; i++) {
        zombies[i].move();
        zombies[i].draw();

        // Check collision with player (for simplicity)
        if (zombies[i].y > canvas.height - 60) {
            health -= 10;
            zombies.splice(i, 1);
            i--;
        }
    }

    // Update coin and health display
    coinCountElement.textContent = coins;
    healthCountElement.textContent = health;

    // Game over condition
    if (health <= 0) {
        endGame();
    }
}

// Spawn a new zombie every 3 seconds
function spawnZombie() {
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = -40;  // Start above the canvas
        zombies.push(new Zombie(x, y));
    }, 3000);
}

// Ask an economic question
function askQuestion() {
    if (currentQuestionIndex < economicQuestions.length) {
        const question = economicQuestions[currentQuestionIndex];
        economicsQuestionElement.textContent = question.question;
        const buttons = answerOptions.querySelectorAll('button');
        buttons[0].textContent = question.options[0];
        buttons[1].textContent = question.options[1];
        buttons[2].textContent = question.options[2];
        buttons[3].textContent = question.options[3];
    }
}

// Check the answer
function checkAnswer(answer) {
    const question = economicQuestions[currentQuestionIndex];
    if (answer === question.correctAnswer) {
        coins += 10;
    } else {
        health -= 10;
    }

    // Proceed to the next question or finish
    currentQuestionIndex++;
    if (currentQuestionIndex >= economicQuestions.length) {
        answerOptions.classList.add('hidden');
        spawnZombie();
    } else {
        askQuestion();
    }
}

// End the game
function endGame() {
    clearInterval(gameInterval);
    gameOverElement.classList.remove('hidden');
}

// Restart the game
function restartGame() {
    gameOverElement.classList.add('hidden');
    startGame();
}

// Start the game when the page loads
startGame();
