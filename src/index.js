const quizData = [
    {
        question: 'Искать ракушки',
        options: [
            'Look for shells',
            'Look for smells',
            'Look for snails',
            'Look for bugs',
        ],
        correctAnswer: 0,
    },
    {
        question: 'Бросать мусор',
        options: [
            'Drop an activity',
            'Drop in the bucket',
            'Drop the ball',
            'Drop litter',
        ],
        correctAnswer: 3,
    },
    {
        question: 'Кормить собаку',
        options: [
            'Feed the rumors',
            'Feed the fire',
            'Feed the dog',
            'Feed the fish',
        ],
        correctAnswer: 2,
    },
    {
        question: 'Произносить по буквам',
        options: ['Spell', 'Smell', 'Swell', 'Snail'],
        correctAnswer: 0,
    },
    {
        question: 'Наносить солнцезащитный крем',
        options: [
            'Throw out sun cream',
            'Pick up sun cream',
            'Put on sun cream',
            'Drop sun cream',
        ],
        correctAnswer: 2,
    },
    {
        question: 'Выпивать чай',
        options: ['Shrink tea', 'Spill tea', 'Pour tea', 'Drink tea'],
        correctAnswer: 3,
    },
    // Add more questions as needed
];

let currentQuestion = 0;
let mistakes = 0;
let gameIsRunning = true;

const questionElement = document.getElementById('question');
const optionsElements = document.querySelectorAll('#options button');
const feedbackElement = document.getElementById('feedback');
const mistakesElement = document.getElementById('mistakes');
const winImageElement = document.getElementById('win-image');

// An array to hold the click listener functions for each button
let buttonListeners = [];

function startQuiz() {
    loadQuestion();
}

function loadQuestion() {
    questionElement.textContent = quizData[currentQuestion].question;
    for (let i = 0; i < optionsElements.length; i++) {
        optionsElements[i].textContent = quizData[currentQuestion].options[i];

        // Remove the previous event listener, if it exists
        if (buttonListeners[i]) {
            optionsElements[i].removeEventListener('click', buttonListeners[i]);
        }

        // Create a new listener function and add it
        buttonListeners[i] = function () {
            if (gameIsRunning) {
                checkAnswer(i);
            }
        };
        optionsElements[i].addEventListener('click', buttonListeners[i]);
    }
}

function checkAnswer(answer) {
    if (answer === quizData[currentQuestion].correctAnswer) {
        anime({
            targets: optionsElements[answer],
            scale: [1, 1.2, 1],
            duration: 800,
            easing: 'easeInOutQuad',
        });
        feedbackElement.style.color = 'green';

        feedbackElement.textContent = 'Correct!';
        currentQuestion++;
        if (currentQuestion >= quizData.length) {
            gameIsRunning = false;
            questionElement.style.display = 'none';
            optionsElements.forEach((element) => {
                element.style.display = 'none';
            });
            feedbackElement.textContent = 'JENYA WINS!';
            feedbackElement.style.fontSize = '24px';
            winImageElement.src =
                'https://images.pexels.com/photos/6250942/pexels-photo-6250942.jpeg'; // Set your own image URL
            winImageElement.style.display = 'block';
            anime({
                targets: '#win-image',
                translateX: 10,
                translateY: 10,
                loop: 16,
                direction: 'alternate',
                duration: 100,
                easing: 'easeInOutSine',
            });
            winImageElement.addEventListener('click', function () {
                resetQuiz();
                feedbackElement.textContent = '';
            });
        } else {
            loadQuestion();
        }
    } else {
        anime({
            targets: optionsElements[answer],
            translateX: [0, -10, 0, 10, 0],
            duration: 800,
            easing: 'easeInOutQuad',
        });
        feedbackElement.style.color = 'red';
        feedbackElement.textContent = 'INCORRECT';
        mistakes++;
        mistakesElement.textContent = mistakes;
        resetQuiz();
    }
}

function resetQuiz() {
    currentQuestion = 0;
    gameIsRunning = true;
    questionElement.style.display = 'block';
    optionsElements.forEach((element) => {
        element.style.display = 'block';
    });
    winImageElement.style.display = 'none';
    loadQuestion();
}

startQuiz();
