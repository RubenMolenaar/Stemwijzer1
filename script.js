var currentSubject = 0;

const StartBtn = document.getElementById("btn");
const title = document.getElementById("Title");
const statement = document.getElementById("Statement");
const pagechange = document.getElementById("page-change");

StartBtn.onclick = function() {
	const container = document.getElementById("container");
	pagechange.style.display = "none";
	container.classList.remove('hidden');
}

title.innerHTML = subjects[currentSubject].title;
statement.innerHTML = subjects[currentSubject].statement;