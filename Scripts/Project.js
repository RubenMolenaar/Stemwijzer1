var currentQuestionIndex = -1;
var total_points_given = 0;
var answerOnQuestion = [];
var important_statements = [];
var important_parties = [];
var party_results = [];

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const startBtn = document.getElementById("startBtn");
const title = document.getElementById("Title");
const statement = document.getElementById("Statement");
const start_div = document.getElementById("start-div");
const awnserBtns = document.getElementsByClassName("awnser-btn");
const progressBar = document.getElementById("question-progress-bar");
const resultButton = document.getElementById("result-btn");
const important_div = document.getElementById("important-div");
const question_div = document.getElementById("question-div");
const main = document.getElementById('main');
const btnkeuzes = document.getElementById('btnkeuzes');
const importment_text = document.getElementById('important-text');
var statement_btns = document.getElementsByClassName('statement-btn');
var parties_btn = document.getElementsByClassName('parties-btn');
const resultbars = document.getElementById('resultbars');
const result_div = document.getElementById('result-div');

startBtn.onclick = function() {
	start_div.style.display = "none";
    question_div.classList.remove('hidden');
    progressBar.setAttribute('aria-valuemax', subjects.length)
    nextQuestion();
}

nextButton.onclick =  e => { nextQuestion(true)};
prevButton.onclick =  e => { prevQuestion()};
resultButton.onclick =  e => { 
    if(e.target.dataset.page == "questions"){
        createStatementButtons()
    }
    else if(e.target.dataset.page == "statement"){
        setStatement()
        createPartiesButtons()
    }
    else if(e.target.dataset.page == "parties"){
        setParties()
        ToResults()
    }
};


for(var i = 0; i < awnserBtns.length; i++){
    awnserBtns[i].onclick = e => { 
        setAwnserForQuestion(e.target.dataset.awnser);
        nextQuestion()
    };
}

function ToResults(){

    important_div.classList.add('hidden');
    result_div.classList.remove('hidden');
    main.classList.remove('hidden');
    parties.forEach(function(party){
        var points = 0;
        answerOnQuestion.forEach(function(element){
            if(subjects[element.question_index].parties.filter(e => e.name == party.name)[0].position == element.awnser){
                if(important_parties.filter(e => e == parties.indexOf(party)).length != 0){
                    points += 0.5;
                    total_points_given += 0.5;
                }
                if(important_statements.filter(e => e == element.question_index).length != 0){
                    points += 0.5;
                    total_points_given += 0.5;
                }
                points += 1;
                total_points_given += 1;
            }
        })
        var procentage_party = Math.round(points / ((subjects.length + ((important_parties.length + important_statements.length) / 2)) / 100));
        party_results.push({'party': parties.indexOf(party), 'procentage': procentage_party})
    })

    if(party_results.length > 0){
        party_results.sort(function(a, b){return b.procentage - a.procentage}).forEach(function(element) {
            resultbars.insertAdjacentHTML('beforeend', `${ parties[element.party].name} <div class="progress"> <div class="progress-bar" data-party="" role="progressbar" style="width: ${element.procentage}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${element.procentage}</div></div>`)     
        })
    }

}

function nextQuestion(skipBtn){
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
        question_div.classList.add('hidden');
        important_div.classList.remove('hidden');
        resultButton.style.display = 'block';

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
        answerOnQuestion[answerOnQuestion.indexOf(existingAwnser[0])].awnser = awnser;
    }
    else{
        answerOnQuestion.push({question_index: currentQuestionIndex, awnser: awnser})
    }
    if(currentQuestionIndex == (subjects.length - 1)){
        createStatementButtons()
        main.classList.add('hidden');
        question_div.classList.add('hidden');
        important_div.classList.remove('hidden');
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
            btnkeuzes.insertAdjacentHTML('beforeend', '<label id="subject-btn-label" class="checkboxes"><input data-index="' + subjects.indexOf(element) + '" class="statement-btn" type="checkbox" id="horns" name="horns">'+ element.title +'</label>')     
        })
        statement_btns = document.getElementsByClassName('statement-btn');
    }
    resultButton.dataset.page = 'statement';
    resultButton.style.display = 'block';

}

function setStatement(element){

    for(var i = 0; i < statement_btns.length; i++){
        if(statement_btns[i].checked == true){
            important_statements.push(statement_btns[i].dataset.index);
        }
    }
}

function setParties(element){

    for(var i = 0; i < parties_btn.length; i++){
        if(parties_btn[i].checked == true){
            important_parties.push(parties_btn[i].dataset.index);
        }
    }

}

function createPartiesButtons() {
    btnkeuzes.innerHTML = '';
    importment_text.innerHTML = 'Welke partijen wil je meenemen in het resultaat?';

    if(parties.length > 0){
        parties.forEach(function(element) {
            btnkeuzes.insertAdjacentHTML('beforeend', '<label id="subject-btn-label" class="checkboxes"><input data-index="' + parties.indexOf(element) + '" class="parties-btn" type="checkbox" id="horns" name="horns">'+ element.name +'</label>')     
        })
    }
    parties_btn = document.getElementsByClassName('parties-btn');
    resultButton.dataset.page = 'parties';
}

function createresultbars() {
    if(parties.length > 0){
        parties.forEach(function(element) {
            resultbars.insertAdjacentHTML('beforeend', ' '+ element.name +'<div class="progress"> <div class="progress-bar" data-party="" role="progressbar" style="width: 50%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div></div>')     
        })
    }
}





