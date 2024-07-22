const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const backButton = document.getElementById('back-btn');
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const questionContainerElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const resultImg = document.getElementById('result-img');

let currentQuestionIndex = 0;
let scoreA = 0;
let scoreB = 0;
let scoreC = 0;

const questions = [
    {
        question: "Bạn có lập kế hoạch chi tiêu hàng tháng không?",
        answers: {
            a: "Có, tôi luôn lập kế hoạch, phân chia các khoản chi phí cần sử dụng và tuân theo nó.",
            b: "Thỉnh thoảng, nếu tôi có kế hoạch chi tiêu lớn.",
            c: "Không, tôi sẽ sử dụng tùy vào nhu cầu cá nhân."
        }
    },
    {
        question: "Khi có một khoản tiền lớn bất ngờ, bạn sẽ làm gì đầu tiên?",
        answers: {
            a: "Đưa vào quỹ tiết kiệm hoặc đầu tư cho một quỹ nào đó (vàng, đất...).",
            b: "Dùng để đi du lịch hoặc mua sắm cho bản thân.",
            c: "Đăng ký khóa học hoặc mua sách, tài liệu để học tập."
        }
    },
    {
        question: "Bạn thường mua sắm đồ dùng cá nhân như thế nào?",
        answers: {
            a: "Theo kế hoạch và nhu cầu cần thiết.",
            b: "Khi có chương trình khuyến mãi hoặc sự kiện đặc biệt.",
            c: "Khi cần thiết cho công việc hoặc học tập."
        }
    },
    {
        question: "Bạn chi tiêu cho việc giải trí và du lịch như thế nào?",
        answers: {
            a: "Theo kế hoạch định trước và trong ngân sách.",
            b: "Rất thường xuyên, tôi ưu tiên trải nghiệm mới.",
            c: "Rất ít, tôi chủ yếu dành tiền cho việc học tập và phát triển bản thân."
        }
    },
    {
        question: "Bạn quản lý các khoản nợ (nếu có) như thế nào?",
        answers: {
            a: "Trả nợ đúng hạn và tránh vay mượn thêm.",
            b: "Chỉ vay mượn khi thực sự cần thiết cho trải nghiệm mới.",
            c: "Chỉ vay để đầu tư cho giáo dục hoặc phát triển nghề nghiệp."
        }
    },
    {
        question: "Bạn có thường xuyên theo dõi và kiểm soát chi tiêu hàng ngày không?",
        answers: {
            a: "Có, tôi luôn kiểm soát chi tiêu một cách cẩn thận.",
            b: "Thỉnh thoảng, tôi kiểm soát chi tiêu cho những trải nghiệm cụ thể.",
            c: "Không thường xuyên, tôi tập trung vào những chi tiêu liên quan đến học tập và phát triển."
        }
    }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showResults();
    }
});
backButton.addEventListener('click', goBackToStart);

function startGame() {
    startScreen.classList.add('hide');
    quizContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    scoreA = 0;
    scoreB = 0;
    scoreC = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainerElement.innerText = question.question;
    Object.keys(question.answers).forEach(key => {
        const button = document.createElement('button');
        button.innerHTML = `<span>${key.toUpperCase()}</span> ${question.answers[key]}`;
        button.classList.add('answer-btn');
        button.addEventListener('click', selectAnswer);
        button.dataset.value = key;
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextButton.classList.add('hide');
}

function selectAnswer(e) {
    const selectedButton = e.target.closest('button');
    const selectedValue = selectedButton.dataset.value;

    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    selectedButton.classList.add('selected');

    if (selectedValue === 'a') {
        scoreA++;
    } else if (selectedValue === 'b') {
        scoreB++;
    } else if (selectedValue === 'c') {
        scoreC++;
    }

    nextButton.classList.remove('hide');
}

function showResults() {
    quizContainer.classList.add('hide');
    resultContainerElement.classList.remove('hide');

    if (scoreA >= scoreB && scoreA >= scoreC) {
        resultImg.src = 'hd.png'; // Thay bằng hình ảnh tương ứng với kết quả "Thánh Chi Tiêu"
    } else if (scoreB >= scoreA && scoreB >= scoreC) {
        resultImg.src = 'ht.png'; // Thay bằng hình ảnh tương ứng với kết quả "Thánh Hưởng Thụ"
    } else {
        resultImg.src = 'tk.png'; // Thay bằng hình ảnh tương ứng với kết quả "Thánh Tiết Kiệm"
    }
}

function goBackToStart() {
    resultContainerElement.classList.add('hide');
    startScreen.classList.remove('hide');
}
