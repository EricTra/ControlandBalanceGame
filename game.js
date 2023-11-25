const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Cách bạn xử lý tình huống giao tiếp căng thẳng?',
        choice1: 'Tôi thường xuyên tránh gặp người khác để không phải đối diện với tình huống giao tiếp căng thẳng.',
        choice2: 'Tôi chủ yếu sử dụng lời lẽ mạnh mẽ và ác độc để làm giảm áp lực trong tình huống giao tiếp căng thẳng.',
        choice3: 'Tôi tự cô lập và không thèm quan tâm đến ý kiến của người khác trong tình huống giao tiếp căng thẳng.',
        choice4: 'Tôi thường lắng nghe trước, thấu hiểu quan điểm của người khác, sau đó đưa ra phản hồi tích cực và kiểm soát cảm xúc của mình.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn duy trì bình tĩnh khi bị gây hấn?',
        choice1: 'Tôi phản ứng bạo lực và tức giận ngay lập tức khi bị gây hấn.',
        choice2: 'Tôi tránh gặp mọi người để không phải đối mặt với tình huống gây hấn.',
        choice3: 'Tôi lặp lại những hành động làm tổn thương bản thân khi bị gây hấn.',
        choice4: 'Tôi tập trung vào việc cân nhắc cảm xúc của mình, có thể thực hiện kỹ thuật thở sâu hoặc rời khỏi tình huống để tránh xung đột với người khác.',
        answer: 4,
    },
    {
        question: 'Cách bạn đối phó với áp lực học tập lớn?',
        choice1: 'Tôi tự ép buộc bản thân hoạt động không ngừng mà không nghỉ ngơi.',
        choice2: 'Tôi hoàn toàn từ bỏ học tập khi gặp áp lực lớn.',
        choice3: 'Tôi dùng các phương pháp làm việc không hiệu quả để giải quyết áp lực học tập.',
        choice4: 'Tôi chia nhỏ công việc, tạo lịch học tập hiệu quả và giữ tâm trí tích cực để không để cảm xúc chi phối quyết định.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Bạn xử lý thế nào lo lắng trước một thách thức lớn?',
        choice1: 'Tôi tập trung vào quản lý lo lắng bằng cách thực hiện kỹ thuật thư giãn, tập trung vào giải pháp và tin tưởng vào khả năng của bản thân.',
        choice2: 'Tôi hoàn toàn tránh bất kỳ thách thức nào để không phải đối mặt với lo lắng.',
        choice3: 'Tôi tự làm tổn thương bản thân bằng cách nghĩ đến những kịch bản tồi tệ nhất.',
        choice4: 'Tôi dùng các phương pháp giải trí ngắn hạn để tránh suy nghĩ về thách thức.',
        answer: 1,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    },
    {
        question: 'Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Rơi vào trạng thái tiêu cực, tự biểu lộ sự tự ti và thất vọng.',
        choice2: 'Đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Bỏ cuộc và không còn nỗ lực gì sau thất bại lớn.',
        choice4: 'Tập trung vào học hỏi từ kinh nghiệm, xác định mục tiêu mới và duy trì sự lạc quan để không bị ảnh hưởng quá mức.',
        answer: 4,
    }
];


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()