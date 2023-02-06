function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function displayQuestion() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;


        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};


function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML = 
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

function showScores() {
    let quizEndHTML = 
    `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

let questions = [
    new Question(
        "Hyper Text Markup Language Stands For?", 
        ["JQuery", "XHTML","CSS", "HTML"], "HTML"
    ),
    new Question(
        "Cascading Style sheet stands for?", 
        ["HTML", "JQuery", "CSS", "XML"], "CSS"
    ),
    new Question(
        "Which is a JavaScript Framework?", 
        ["React", "Laravel","Django", "Sass"], "React"
        ),
    new Question(
        "Which is a backend language?", 
        ["PHP", "HTML", "React", "All"], "PHP"
        ),
    new Question(
        "Which is best for Artificial intelligence?", 
        ["React", "Laravel","Python", "Sass"], "Python"
    ),
    new Question(
        "Which of the following is not javascript data types?", 
        ["Null type", "Undefined type","Number type", "All of the mentioned"], "All of the mentioned"
    ),
    new Question(
        "Javascript is an type of language?", 
        ["Object-Orientated", "Object-based","Procedural", "None"], "Object-Orientated"
    ),
    new Question(
        "How can a datatype be declared to be a constant type?", 
        ["const", "constant","var", "let"], "const"
    ),
    new Question(
        "What keyword is used to check whether a given property is valid or not?", 
        ["in", "is in","exists", "lies"], "in"
    ),
    new Question(
        "Which of the following can be used to call a JavaScript Code Snippet?", 
        ["Function/Method", "Preprocessor","Triggering Event", "RMI"], "Function/Method"
    ),
];


let quiz = new Quiz(questions);
displayQuestion();

let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown(){
    let quizTimer = setInterval(function(){
    if(quizTime <= 0) {
        clearInterval(quizTimer);
        showScores();
    } else {
        quizTime--;
        let sec = Math.floor(quizTime % 60);
        let min = Math.floor(quizTime / 60) % 60;
        counting.innerHTML = `TIME: ${min} : ${sec}`;   
    }
},1000);
}

startCountdown();