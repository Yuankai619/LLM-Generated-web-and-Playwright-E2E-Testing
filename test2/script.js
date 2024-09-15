const questions = [
    { correct: 'a' },
    { correct: 'b' },
    { correct: 'c' }
];

let currentQuestion = 0;
let answers = [];
let quizSubmitted = false;

const questionCountEl = document.querySelector('.question-count');
const optionsEl = document.querySelector('.options');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resultEl = document.querySelector('.result');

function updateQuestion() {
    questionCountEl.textContent = `第 ${currentQuestion + 1} 題 / 共 ${questions.length} 題`;

    optionsEl.innerHTML = '';
    optionsEl.className = 'options';
    if (quizSubmitted) {
        optionsEl.classList.add(answers[currentQuestion] === questions[currentQuestion].correct ? 'correct-question' : 'incorrect-question');
    }

    for (let i = 0; i < 4; i++) {
        const option = document.createElement('div');
        option.className = 'option';
        const letter = String.fromCharCode(97 + i);
        option.textContent = `(${letter}): 答案${letter}${currentQuestion + 1}`;
        if (!quizSubmitted) {
            option.onclick = () => selectOption(letter);
        }
        if (answers[currentQuestion] === letter) {
            option.classList.add('selected');
        }
        optionsEl.appendChild(option);
    }

    prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
    
    if (currentQuestion === questions.length - 1 && !quizSubmitted) {
        nextBtn.textContent = '送出測驗';
    } else {
        nextBtn.textContent = '下一個問題';
    }
    nextBtn.style.display = currentQuestion < questions.length - 1 || !quizSubmitted ? 'block' : 'none';
}

function selectOption(letter) {
    answers[currentQuestion] = letter;
    updateQuestion();
}

prevBtn.onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion();
    }
};

nextBtn.onclick = () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        updateQuestion();
    } else if (!quizSubmitted) {
        showResult();
    }
};

function showResult() {
    quizSubmitted = true;
    const correctCount = answers.filter((answer, index) => answer === questions[index].correct).length;
    resultEl.textContent = `答對題數：${correctCount} / 總題數：${questions.length}`;
    resultEl.style.display = 'block';
    updateQuestion();
}

updateQuestion();