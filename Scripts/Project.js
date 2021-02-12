var currentQuestionIndex = 0;
var answerOnQuestion = [{question_index: 3, awnser: "pro"}, {question_index: 1, awnser: "pro"}];

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const startBtn = document.getElementById("startBtn");
const title = document.getElementById("Title");
const statement = document.getElementById("Statement");
const pagechange = document.getElementById("page-change");
var awnserBtns = document.getElementsByClassName("awnser-btn");

startBtn.onclick = function() {
	const container = document.getElementById("container");
	pagechange.style.display = "none";
    container.classList.remove('hidden');
    nextQuestion();
}

nextButton.onclick =  e => { nextQuestion()};
prevButton.onclick =  e => { prevQuestion()};

for(var i = 0; i < awnserBtns.length; i++){
    awnserBtns[i].onclick = e => { 
        setAwnserForQuestion(e.target.dataset.awnser);
        nextQuestion()
    }; 
}


function nextQuestion(){
    if((currentQuestionIndex + 1) < subjects.length){
        currentQuestionIndex++;
        title.innerHTML = subjects[currentQuestionIndex].title;
        statement.innerHTML = subjects[currentQuestionIndex].statement;
    }
}

function prevQuestion(){
    if((currentQuestionIndex - 1) > 0){
        currentQuestionIndex--;
        title.innerHTML = subjects[currentQuestionIndex].title;
        statement.innerHTML = subjects[currentQuestionIndex].statement;
    }
}

function setAwnserForQuestion(awnser){
    var existingAwnser = answerOnQuestion.filter(e => e.question_index == currentQuestionIndex);
    if(existingAwnser.length > 0){
        console.log(answerOnQuestion.indexOf(existingAwnser[0]));
        answerOnQuestion[answerOnQuestion.indexOf(existingAwnser[0])].awnser = awnser;
        console.log(answerOnQuestion);
    }
    else{
        answerOnQuestion.push({question_index: currentQuestionIndex, awnser: awnser})
        console.log(answerOnQuestion);
    }
}





