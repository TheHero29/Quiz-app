const questions = [
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        options: ["<script src='script.js'>", "<script href='script.js'>", "<script ref='script.js'>", "<script name='script.js'>"],
        answer: "<script src='script.js'>"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');"],
        answer: "alert('Hello World');"
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function = myFunction()", "function myFunction()", "function: myFunction()", "createFunction myFunction()"],
        answer: "function myFunction()"
    },
   
    // Add more questions here...
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionButtons = [
    document.getElementById('option1'),
    document.getElementById('option2'),
    document.getElementById('option3'),
    document.getElementById('option4')
];
const scoreElement = document.getElementById('scoreValue');
const currentQuestionElement = document.getElementById('currentQuestion');
const totalQuestionsElement = document.getElementById('totalQuestions');
const progressElement = document.getElementById('progress');

totalQuestionsElement.textContent = questions.length;


optionButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        checkAnswer(button, index);
    });
});

function loadQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;

    optionButtons.forEach((button, index) => {
        button.textContent = q.options[index];
        button.classList.remove('correct', 'wrong','clicked');
        button.disabled = false;
    });

    scoreElement.textContent = score;

    currentQuestionElement.textContent = currentQuestion + 1;
    progressElement.style.width = ((currentQuestion) / questions.length) * 100 + '%';
}

function checkAnswer(button, index) {
    const q = questions[currentQuestion];
    // button.classList.add('clicked');
    if (q.options[index] === q.answer) {
        score+=10;
        scoreElement.textContent = score;
        button.classList.add('correct');
    } else {
        button.classList.add('wrong');
        optionButtons.forEach((btn, idx) => {
            if (q.options[idx] === q.answer) {
                btn.classList.add('correct');
            }
        });
    }
    
    optionButtons.forEach(btn => btn.disabled = true);

    currentQuestion++;
    if (currentQuestion < questions.length) {
        setTimeout(loadQuestion, 500);
    } else {
        setTimeout(() => {
            localStorage.setItem('quizScore', score);
            window.location.href = 'end.html';
        }, 500);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadQuestion();
});