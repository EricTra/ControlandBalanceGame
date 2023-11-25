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
        choice2: 'Tôi thường lắng nghe trước, thấu hiểu quan điểm của người khác, sau đó đưa ra phản hồi tích cực và kiểm soát cảm xúc của mình.',
        choice3: 'Tôi tự cô lập và không thèm quan tâm đến ý kiến của người khác trong tình huống giao tiếp căng thẳng.',
        choice4: 'Tôi chủ yếu sử dụng lời lẽ mạnh mẽ và ác độc để làm giảm áp lực trong tình huống giao tiếp căng thẳng.',
        answer: 2,
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
        choice1: 'Tôi chia nhỏ công việc, tạo lịch học tập hiệu quả và giữ tâm trí tích cực để không để cảm xúc chi phối quyết định.',
        choice2: 'Tôi hoàn toàn từ bỏ học tập khi gặp áp lực lớn.',
        choice3: 'Tôi dùng các phương pháp làm việc không hiệu quả để giải quyết áp lực học tập.',
        choice4: 'Tôi tự ép buộc bản thân hoạt động không ngừng mà không nghỉ ngơi.',
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
        question: 'Bạn xử lý thế nào lo lắng trước một thách thức lớn?',
        choice1: 'Tôi tập trung vào quản lý lo lắng bằng cách thực hiện kỹ thuật thư giãn, tập trung vào giải pháp và tin tưởng vào khả năng của bản thân.',
        choice2: 'Tôi hoàn toàn tránh bất kỳ thách thức nào để không phải đối mặt với lo lắng.',
        choice3: 'Tôi tự làm tổn thương bản thân bằng cách nghĩ đến những kịch bản tồi tệ nhất.',
        choice4: 'Tôi dùng các phương pháp giải trí ngắn hạn để tránh suy nghĩ về thách thức.',
        answer: 1,
    },
    {
        question: 'Lợi ích của việc thực hiện kỹ thuật thở sâu và thư giãn là gì?',
        choice1: 'Kỹ thuật thở sâu không có ảnh hưởng đáng kể đến tâm trạng và cảm xúc.',
        choice2: 'Việc thư giãn chỉ là một cách để tránh những vấn đề thực tế.',
        choice3: 'Kỹ thuật thở sâu giúp giữ bình tĩnh và kiểm soát cảm xúc trong tình huống căng thẳng. Nó làm giảm căng thẳng, tăng sự tập trung và mang lại sự thoải mái.',
        choice4: ' Thực hiện thư giãn và thở sâu chỉ là sự lãng phí thời gian.',
        answer: 3,
    },
    {
        question: 'Tầm quan trọng của việc hiểu biết về cảm xúc là gì?',
        choice1: 'Hiểu biết về cảm xúc là quan trọng để kiểm soát chúng. Nhận ra và chấp nhận cảm xúc giúp tạo ra sự cân bằng và quyết định tự do.',
        choice2: 'Việc hiểu biết về cảm xúc không có ý nghĩa trong quyết định hàng ngày.',
        choice3: 'Bạn không cần phải quan tâm đến cảm xúc của mình và người khác.',
        choice4: 'Cảm xúc chỉ là thứ gì đó cản trở và không đáng chú ý.',
        answer: 1,
    },
    {
        question: 'Việc tập trung và thiền định làm thế nào giúp kiểm soát cảm xúc?',
        choice1: 'Tập trung và thiền định không ảnh hưởng đến trạng thái tâm lý.',
        choice2: 'Tất cả mọi người đều có thể kiểm soát cảm xúc mà không cần tập trung và thiền định.',
        choice3: 'Tập trung và thiền định chỉ là những hoạt động tốn thời gian mà không mang lại lợi ích gì.',
        choice4: 'Tập trung vào hiện tại và thiền định giúp kiểm soát cảm xúc bằng cách làm dịu tâm trí, giảm căng thẳng và tạo ra tâm trạng tích cực.',
        answer: 4,
    },
    {
        question: 'Sử dụng tư duy tích cực như thế nào để duy trì động lực?',
        choice1: 'Tư duy tích cực là sự lạc quan mù quáng, không có thực tế.',
        choice2: 'Tư duy tích cực giúp duy trì động lực bằng cách nhìn nhận khó khăn như cơ hội học hỏi và phát triển.',
        choice3: 'Chấp nhận mọi tình huống mà không cần phải tìm giải pháp tích cực.',
        choice4: 'Tư duy tích cực chỉ là cách giả vờ để vượt qua khó khăn.',
        answer: 2,
    },
    {
        question: 'Kỹ năng giao tiếp hiệu quả trong tình huống cảm xúc cao điểm?',
        choice1: 'Giao tiếp hiệu quả trong tình huống cảm xúc cao điểm đòi hỏi sự kiểm soát cảm xúc trước, sử dụng ngôn từ khôn ngoan để truyền đạt cảm xúc một cách rõ ràng và bình tĩnh.',
        choice2: 'Sử dụng lời lẽ mạnh mẽ và quá mức để truyền đạt cảm xúc.',
        choice3: 'Lạc quan mù quáng và không chú ý đến tình cảm của người khác.',
        choice4: 'Tránh giao tiếp hoặc chỉ sử dụng cử chỉ hình thể mà không nói.',
        answer: 1,
    },
    {
        question: 'Khi gặp xung đột, bạn thường làm gì để duy trì sự bình tĩnh và kiểm soát cảm xúc?',
        choice1: 'Tôi phản ứng tức giận và chỉ trích đối tác khi gặp xung đột.',
        choice2: 'Tôi đổ lỗi cho người khác hoặc hoàn cảnh khi gặp thất bại lớn.',
        choice3: 'Tôi thường tập trung vào việc lắng nghe trước, hiểu quan điểm của đối tác trước khi đưa ra phản hồi. Điều này giúp duy trì sự bình tĩnh và kiểm soát cảm xúc.',
        choice4: 'Tôi không ngừng đánh đổi ý kiến mà không lắng nghe đối tác.',
        answer: 3,
    },
    {
        question: 'Trong công việc nhóm, bạn đã gặp tình huống nào khiến bạn cảm thấy cảm xúc cao điểm. Làm thế nào để bạn đối phó với điều này?',
        choice1: 'Bỏ cuộc và không còn đóng góp ý kiến trong công việc nhóm khi gặp khó khăn.',
        choice2: 'Tự cô lập và không hợp tác với đồng đội khi gặp cảm xúc cao điểm.        ',
        choice3: 'Chủ động chỉ trích và phê phán người khác khi gặp khó khăn trong công việc nhóm.',
        choice4: 'Nếu gặp tình huống cảm xúc cao điểm, tôi lắng nghe ý kiến của người khác và cố gắng hiểu quan điểm của họ để duy trì sự bình tĩnh và tìm ra giải pháp chung.',
        answer: 4,
    },
    {
        question: 'Bạn đã gặp phải tình huống nào khi cảm xúc của người khác ảnh hưởng đến bạn.Làm thế nào để bạn giải quyết vấn đề này?',
        choice1: 'Tôi thường tìm cách thể hiện sự hiểu biết, lắng nghe và tìm giải pháp chung để tạo ra môi trường tích cực.',
        choice2: 'Tôi tự chủ động biểu lộ cảm xúc tiêu cực và tăng cường sự căng thẳng trong môi trường làm việc.',
        choice3: 'Lạc quan mù quáng và không quan tâm đến tình cảm của người khác.',
        choice4: 'Tránh gặp người khác khi họ có cảm xúc tiêu cực.',
        answer: 1,
    },
    {
        question: 'Đối mặt với sự thay đổi, bạn đã làm gì để điều chỉnh tâm lý của mình. Làm thế nào bạn giữ tinh thần sau khi thất bại lớn?',
        choice1: 'Tôi tự cô lập và không chấp nhận bất kỳ thay đổi nào trong công việc hoặc cuộc sống.',
        choice2: 'Tôi tập trung vào những khía cạnh tích cực của thay đổi, tìm cơ hội mới và tạo ra kế hoạch hành động để thích ứng.',
        choice3: 'Quá mức lo lắng và tự tạo ra những vấn đề không thực tế về sự thay đổi.',
        choice4: 'Tìm mọi cách để tránh sự thay đổi và giữ nguyên tình trạng hiện tại.',
        answer: 2,
    },
    {
        question: 'Bạn đánh giá cao yếu tố nào nhất trong việc duy trì một tâm lý tích cực?',
        choice1: 'Đặt quá nhiều kỳ vọng và chỉ tập trung vào những mục tiêu lớn mà không chú ý đến những thành tựu nhỏ.',
        choice2: 'Tự nhốt mình trong những ý kiến tiêu cực và không chấp nhận sự lạc quan.',
        choice3: 'Phụ thuộc hoàn toàn vào nguồn động viên từ người khác để duy trì tâm lý tích cực.',
        choice4: 'Việc duy trì một tâm lý tích cực đòi hỏi sự lạc quan và lòng biết ơn. Tôi đánh giá cao khả năng nhìn nhận tích cực, dù là những thách thức nhỏ, để duy trì tâm lý tích cực.',
        answer: 4,
    },
    {
        question: 'Sự quan trọng của việc thiết lập mục tiêu và kế hoạch hành động trong quản lý cảm xúc là gì?',
        choice1: 'Không cần thiết lập mục tiêu và kế hoạch hành động vì chúng chỉ tạo thêm áp lực.        ',
        choice2: 'Thiết lập mục tiêu và kế hoạch hành động trong quản lý cảm xúc giúp tạo ra một khung cảnh rõ ràng, giúp tôi tập trung vào điều mình muốn đạt được và giảm căng thẳng từ không rõ đường hướng.',
        choice3: 'Chấp nhận mọi tình huống mà không cần phải có một kế hoạch cụ thể.',
        choice4: 'Tự đặt ra mục tiêu quá lớn và không thể đạt được trong thời gian ngắn.',
        answer: 2,
    },
    {
        question: 'Làm thế nào bạn duy trì sự kiên nhẫn khi đối mặt với thách thức?',
        choice1: 'Tôi tự làm tổn thương bản thân khi gặp khó khăn và không kiên nhẫn.',
        choice2: 'Để duy trì sự kiên nhẫn, tôi thường nhắc nhở bản thân về mục tiêu lớn hơn, tìm hiểu từ những thất bại và tập trung vào quyết định hành động tích cực.',
        choice3: 'Tôi bỏ cuộc ngay lập tức khi gặp trở ngại.',
        choice4: 'Chờ đợi người khác giải quyết vấn đề thay vì tự tìm giải pháp.',
        answer: 2,
    },
    {
        question: 'Trong tình huống xung đột quan điểm, bạn làm thế nào để tìm ra giải pháp hoà hợp?',
        choice1: 'Tôi cố gắng hiểu quan điểm của đối tác, tìm điểm chung và đề xuất giải pháp hoà hợp mà cả hai đều có thể chấp nhận được.',
        choice2: 'Tôi cứng đầu và kiên quyết giữ quan điểm cá nhân mà không cân nhắc đến ý kiến của người khác.',
        choice3: 'Rút lui và không tham gia vào quá trình tìm giải pháp.',
        choice4: 'Chấp nhận ý kiến của người khác mà không có ý kiến của bản thân.',
        answer: 1,
    },
    {
        question: 'Trong môi trường làm việc áp lực, bạn sử dụng phương pháp nào để giữ tinh thần làm việc tích cực?',
        choice1: 'Tôi hoàn toàn tránh áp lực bằng cách làm những công việc dễ dàng hơn.',
        choice2: 'Tôi chấp nhận áp lực mà không cố gắng giải quyết.',
        choice3: 'Tôi tự làm tổn thương bản thân và không tìm kiếm giải pháp.',
        choice4: 'Tôi sử dụng kỹ thuật quản lý thời gian, ưu tiên công việc và giữ tâm trạng lạc quan để duy trì tinh thần tích cực.',
        answer: 4,
    },
    {
        question: 'Làm thế nào để bạn duy trì một mức độ tự tin lành mạnh trong công việc và cuộc sống?',
        choice1: 'Tôi liên tục học hỏi, phát triển kỹ năng và tập trung vào những thành công của bản thân thay vì những thất bại.',
        choice2: 'Tôi so sánh bản thân với người khác và tự ti về những khía cạnh yếu đuối.',
        choice3: 'Tôi phụ thuộc hoàn toàn vào đánh giá từ người khác để xác định mức độ tự tin.',
        choice4: 'Tự hạn chế và không thử thách bản thân để phát triển.',
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
const MAX_QUESTIONS = 20

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