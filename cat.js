const quizData = [
    {
        question: "What vibe are you looking for in your cat?",
        options: ["Feral", "Domesticated", "Garfield",],
       
    },
   
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    optionsElement.innerHTML = "";
    currentQuizData.options.forEach((option) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', checkAnswer);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(event) {
    const selectedOption = event.target.innerText;
    const currentQuizData = quizData[currentQuestion];
    if (selectedOption === currentQuizData.correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.innerText = `You scored ${score} out of ${quizData.length}!`;
    optionsElement.innerHTML = "";
    nextButton.style.display = 'none';
}

nextButton.addEventListener('click', loadQuestion);

loadQuestion();
