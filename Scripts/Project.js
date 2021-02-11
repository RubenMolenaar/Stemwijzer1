var questionIndex = 0;
var answerOnQuestion = [{question_index: 3, awnser: "pro"}, {question_index: 2, awnser: "pro"}, {question_index: 1, awnser: "pro"}];

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const startBtn = document.getElementById("startBtn");
const title = document.getElementById("Title");
const statement = document.getElementById("Statement");
const pagechange = document.getElementById("page-change");

startBtn.onclick = function() {
	const container = document.getElementById("container");
	pagechange.style.display = "none";
	container.classList.remove('hidden');
}

setAwnserForQuestion();
prevButton.onclick = prevQuestion()
nextButton.onclick = nextQuestion()

function nextQuestion(){
    questionIndex++;
    title.innerHTML(subjects[questionIndex])
    statement.innerHTML(subjects[questionIndex])
}

function prevQuestion(){
    questionIndex--;
    title.innerHTML(subjects[questionIndex])
    statement.innerHTML(subjects[questionIndex])
}

function setAwnserForQuestion(){
    if(answerOnQuestion.includes(questionIndex == 1)){
        // answerOnQuestion.push({})
        console.log("jaaaa");
    }
    
}





