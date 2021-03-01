var currentQuestionIndex = -1;
var answerOnQuestion = [];
var important_statements = [];
var important_parties = [];


const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const startBtn = document.getElementById("startBtn");
const title = document.getElementById("Title");
const statement = document.getElementById("Statement");
const start_div = document.getElementById("start-div");
const awnserBtns = document.getElementsByClassName("awnser-btn");
const progressBar = document.getElementById("question-progress-bar");
const resultButton = document.getElementById("result-btn");
const important_statement_div = document.getElementById("important-div");
const question_div = document.getElementById("question-div");
const main = document.getElementById('main');
const btnkeuzes = document.getElementById('btnkeuzes');
const importment_text = document.getElementById('important-text');

startBtn.onclick = function() {
	start_div.style.display = "none";
    question_div.classList.remove('hidden');
    progressBar.setAttribute('aria-valuemax', subjects.length)
    nextQuestion();
}

nextButton.onclick =  e => { nextQuestion(true)};
prevButton.onclick =  e => { prevQuestion()};
resultButton.onclick =  e => { 
    createPartiesButtons()
};

for(var i = 0; i < awnserBtns.length; i++){
    awnserBtns[i].onclick = e => { 
        setAwnserForQuestion(e.target.dataset.awnser);
        nextQuestion()
    }; 
}


function nextQuestion(skipBtn){
    console.log();
    if((currentQuestionIndex + 1) < subjects.length){
        currentQuestionIndex++;
        title.innerHTML = subjects[currentQuestionIndex].title;
        statement.innerHTML = subjects[currentQuestionIndex].statement;
        progressBar.setAttribute('aria-valuenow', currentQuestionIndex);
        progressBar.style.width = currentQuestionIndex / (subjects.length / 100) + "%";
    }
    else if(currentQuestionIndex == (subjects.length - 1) && skipBtn){
        createStatementButtons()
        main.classList.add('hidden');
        important_statement_div.classList.remove('hidden');
    }
}

function prevQuestion(){
    if((currentQuestionIndex - 1) > -1){
        if(resultButton.style.display != 'none'){
            hideToResults();
        }
        currentQuestionIndex--;
        title.innerHTML = subjects[currentQuestionIndex].title;
        statement.innerHTML = subjects[currentQuestionIndex].statement;
        progressBar.setAttribute('aria-valuenow', currentQuestionIndex)
        progressBar.style.width = currentQuestionIndex / (subjects.length / 100) + "%";
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
    if(currentQuestionIndex == (subjects.length - 1)){
        createStatementButtons()
        main.classList.add('hidden');
        important_statement_div.classList.remove('hidden');
    }
}
function showToResults(){
    resultButton.style.display = 'block';
        progressBar.style.width = (currentQuestionIndex + 1) / (subjects.length / 100) + "%";
        nextButton.style.display = 'none';
}
function hideToResults(){
    resultButton.style.display = 'none';
    nextButton.style.display = 'block';
}

function createStatementButtons() {
    if(subjects.length > 0){
        subjects.forEach(function(element) {
            btnkeuzes.insertAdjacentHTML('beforeend', '<div class="checkboxes"><input data-index="' + subjects.indexOf(element) + '" class="subjects-btn" type="checkbox" id="horns" name="horns"><label id="subject-btn-label" for="horns">'+ element.title +'</label></div>')     
        })
    }
}

function createPartiesButtons() {
    btnkeuzes.innerHTML = '';
    importment_text.innerHTML = 'Welke partijen wil je meenemen in het resultaat?';
    resultButton.innerHTML = 'Naar resultaten';
    if(parties.length > 0){
        parties.forEach(function(element) {
            btnkeuzes.insertAdjacentHTML('beforeend', '<div class="checkboxes"><input data-index="' + parties.indexOf(element) + '" class="parties-btn" type="checkbox" id="horns" name="horns"><label id="subject-btn-label" for="horns">'+ element.name +'</label></div>')     
        })
    }
}




