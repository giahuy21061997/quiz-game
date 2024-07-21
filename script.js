const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const submitButton = document.getElementById('submit-btn')
const questionContainerElement = document.getElementById('question-container')
const resultContainerElement = document.getElementById('result-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultElement = document.getElementById('result')

let currentQuestionIndex = 0
let scoreA = 0
let scoreB = 0
let scoreC = 0

const questions = [
    {
        question: "Bạn có lập kế hoạch chi tiêu hàng tháng không?",
        answers: {
            a: "Có, tôi luôn lập kế hoạch, phân chia các khoản chi phí cần sử dụng và tuân theo nó.",
            b: "Thỉnh thoảng, nếu tôi có kế hoạch chi tiêu lớn.",
            c: "Không, tôi sẽ sử dụng tuỳ vào nhu cầu cá nhân."
        }
    },
    {
        question: "Khi có một khoản tiền lớn bất ngờ, bạn sẽ làm gì đầu tiên?",
        answers: {
            a: "Đưa vào quỹ tiết kiệm hoặc đầu tư cho một quỹ nào đó (vàng, đất…).",
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
]

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    currentQuestionIndex = 0
    scoreA = 0
    scoreB = 0
    scoreC = 0
    questionContainerElement.classList.remove('hide')
    nextButton.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = `Câu ${currentQuestionIndex + 1}: ${question.question}`
    Object.keys(question.answers).forEach(key => {
        const button = document.createElement('button')
        button.innerText = question.answers[key]
        button.classList.add('btn')
        button.addEventListener('click', selectAnswer)
        button.dataset.value = key
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    nextButton.classList.add('hide')
    submitButton.classList.add('hide')
}

function selectAnswer(e) {
    const selectedButton = e.target
    const selectedValue = selectedButton.dataset.value

    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.remove('selected')
    })
    selectedButton.classList.add('selected')

    if (selectedValue === 'a') {
        scoreA++
    } else if (selectedValue === 'b') {
        scoreB++
    } else if (selectedValue === 'c') {
        scoreC++
    }

    if (currentQuestionIndex + 1 < questions.length) {
        nextButton.classList.remove('hide')
    } else {
        submitButton.classList.remove('hide')
    }
}

submitButton.addEventListener('click', showResult)

function showResult() {
    questionContainerElement.classList.add('hide')
    resultContainerElement.classList.remove('hide')
    let resultText
    if (scoreA > scoreB && scoreA > scoreC) {
        resultText = 'Bạn thuộc dạng chi tiêu có kế hoạch.'
    } else if (scoreB > scoreA && scoreB > scoreC) {
        resultText = 'Bạn thuộc dạng chi tiêu theo trải nghiệm.'
    } else if (scoreC > scoreA && scoreC > scoreB) {
        resultText = 'Bạn thuộc dạng chi tiêu cho đầu tư và phát triển cá nhân.'
    } else {
        resultText = 'Bạn có phong cách chi tiêu cân bằng giữa các xu hướng.'
    }
    resultElement.innerText = resultText
}
