document.getElementById('start-image').addEventListener('dblclick', startQuiz);

let currentQuestion = 0;
let buttonsDisabled = false;

const questions = [
    { question: "Какой продукт используют для приготовления бешамеля?", answers: ["Сметана", "Молоко", "Сливки"], correctAnswer: 2 },
    { question: "Какой оператор используется для выделения памяти под массив в языке C?", answers: ["free", "malloc", "realloc"], correctAnswer: 1 },
    { question: "Что такое утечка памяти и как ее избежать в языке C?", answers: ["Это когда память не освобождается после использования.", "Это когда используется слишком много памяти.", "Это когда память выделяется, но не используется."], correctAnswer: 0 },
];

function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');

    // Предварительная загрузка изображений
    const images = ['yes.jpg', 'no.jpg', 'finish_capture.png'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Start background music
    const backgroundAudio = document.getElementById('background-audio');
    backgroundAudio.play();

    showQuestion();
}

function showQuestion() {
    const questionText = document.getElementById('question-text');
    questionText.textContent = questions[currentQuestion].question;

    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((button, index) => {
        button.textContent = questions[currentQuestion].answers[index];
        button.onclick = () => checkAnswer(index);
    });

    buttonsDisabled = false;
}

function checkAnswer(selectedAnswer) {
    if (buttonsDisabled) return;

    buttonsDisabled = true;
    const correctAnswer = questions[currentQuestion].correctAnswer;
    const feedbackImage = document.getElementById('feedback-image');
    feedbackImage.classList.remove('hidden');

    if (selectedAnswer === correctAnswer) {
        feedbackImage.src = 'yes.jpg';
        feedbackImage.style.animation = 'slide-from-right 1s forwards';

        // Добавляем класс для мигания зеленым
        const selectedButton = document.querySelectorAll('.answer-btn')[selectedAnswer];
        selectedButton.classList.add('blink-green');
        console.log('Added blink-green to:', selectedButton);

        // Проигрываем звук правильного ответа
        const goodAudio = document.getElementById('good-audio');
        goodAudio.play();

        setTimeout(() => {
            feedbackImage.classList.add('hidden');
            feedbackImage.style.animation = '';

            // Удаляем классы мигания
            document.querySelectorAll('.answer-btn').forEach(button => button.classList.remove('blink-red', 'blink-green'));

            currentQuestion++;
            if (currentQuestion >= questions.length) {
                showFinishScreen();
            } else {
                showQuestion();
            }
        }, 3000);
    } else {
        feedbackImage.src = 'no.jpg';
        feedbackImage.style.animation = 'slide-from-left 1s forwards';

        // Добавляем класс для мигания красным
        const selectedButton = document.querySelectorAll('.answer-btn')[selectedAnswer];
        selectedButton.classList.add('blink-red');
        console.log('Added blink-red to:', selectedButton);

        // Проигрываем звук неправильного ответа
        const errorAudio = document.getElementById('error-audio');
        errorAudio.play();

        setTimeout(() => {
            feedbackImage.classList.add('hidden');
            feedbackImage.style.animation = '';

            // Удаляем классы мигания
            document.querySelectorAll('.answer-btn').forEach(button => button.classList.remove('blink-red'));

            buttonsDisabled = false;
        }, 3000);
    }
}

function showFinishScreen() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('finish-screen').classList.remove('hidden');
}
