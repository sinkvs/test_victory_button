document.getElementById('start-image').addEventListener('dblclick', startQuiz);

let currentQuestion = 0;
let buttonsDisabled = false;

const questions = [
    { question: "Какой продукт используют для приготовления бешамеля?", answers: ["Сметана", "Молоко", "Сливки"], correctAnswer: 2 },
    { question: "Какой оператор используется для выделения памяти под массив в языке C?", answers: ["free", "malloc", "realloc"], correctAnswer: 1 },
    { question: "Что такое утечка памяти и как ее избежать в языке C?", answers: ["Это когда память не освобождается после использования.", "Это когда используется слишком много памяти.", "Это когда память выделяется, но не используется."], correctAnswer: 0 },
    { question: "Как женщина решает, что надеть утром?", answers: ["Смотрит на погоду", "Перемеряет весь гардероб", "Спрашивает совета у подруги"], correctAnswer: 1 },
    { question: "Что такое \"фуа-гра\"?", answers: ["Вид сыра", "Паштет из утиной печени", "Десерт из фруктов"], correctAnswer: 1 },
    { question: "Какой напиток помогает женщинам справляться с любыми трудностями?", answers: ["Чай", "Кофе", "Вино"], correctAnswer: 2 },
    { question: "Как программист объясняет слово «рекурсия»?", answers: ["Чтобы понять рекурсию, нужно понять рекурсию", "Это когда ты забыл, где начал", "Магия с стеком"], correctAnswer: 0 },
    { question: "Что такое указатель на функцию в языке C?", answers: ["Это указатель, который хранит адрес переменной.", "Это указатель, который хранит адрес функции.", "Это указатель, который хранит значение функции."], correctAnswer: 1 },
    { question: "Почему женщины всегда правы?", answers: ["Потому что они всегда правы", "Потому что они так решили", "Потому что это закон природы"], correctAnswer: 0 },
    { question: "Какой символ используется для обозначения однострочного комментария в языке C?", answers: ["//", "/* ... */", "--"], correctAnswer: 0 },
    { question: "Какой тип данных используется для хранения целых чисел в языке C?", answers: ["float", "int", "double"], correctAnswer: 1 },
    { question: "Как объявить массив в языке C?", answers: ["array[5] = {1, 2, 3, 4, 5};", "int array[] = {1, 2, 3, 4, 5};", "int array(5) = {1, 2, 3, 4, 5};"], correctAnswer: 1 },
    { question: "Что программисты пьют, чтобы превратить мысли в код?", answers: ["Кровь врагов", "Энергетики", "Кофе (желательно тройной эспрессо)"], correctAnswer: 2 },
    { question: "Что говорит программист, когда код работает с первого раза?", answers: ["Так не бывает!", "Я гений!", "Наверное, это сон"], correctAnswer: 0 },
    { question: "Что делает женщина, когда мужчина говорит: \"Я все сделал\"?", answers: ["Верит", "Проверяет", "Хвалит"], correctAnswer: 1 },
    { question: "Какой супергерой мечты каждой женщины?", answers: ["Супермен", "Человек-паук", "Мужчина, который убирает за собой"], correctAnswer: 2 },
    { question: "Что такое \"идеальный отпуск\" для женщины?", answers: ["Поход в горы", "Шопинг в Париже", "Рыбалка на озере"], correctAnswer: 1 },
    { question: "Какого блюда не существует?", answers: ["Конь в пальто", "Цыпленок в рубашке", "Рулька в рубашке"], correctAnswer: 1 },
    { question: "Что такое \"чернина\"?", answers: ["Итальянская паста", "Испанский суп из черной фасоли", "Мексиканский соус"], correctAnswer: 1 },
    { question: "Почему кошки обожают клавиатуры?", answers: ["Хотят написать свой код", "Это тёплая подушка с кнопочками", "Мешают хозяину работать"], correctAnswer: 0 }
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
