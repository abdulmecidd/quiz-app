const ui = new UI();
const quiz = new Question(questions);

let currentId = 0;
let scorePoint = 0;
let counter;

const saveData = () => {
  localStorage.setItem("currentId", JSON.stringify(currentId));
  localStorage.setItem("scorePoint", JSON.stringify(scorePoint));
};

const playAudio = (url) => {
  new Audio(url).play();
};

const score = (score) => {
  let tag = `<span class="score"><i class="fas fa-star" aria-hidden="true"></i> ${score}</span>`;
  ui.scoreBoard.innerHTML = tag;
};

checkAnswer = function (answer) {
  return questions[currentId].correctAnswer === answer;
};

const nextQuestion = () => {
  if (currentId !== questions[8].questionId) {
    currentId++;
    ui.showQuestion(currentId);
    currentId;
    clearInterval(counter);
    startTimer(questions[currentId].solveTime);
    questionNum(questions[currentId].questionId, questions.length);
    saveData();
  } else {
    ui.quizBox.classList.remove("active");
    ui.resultScreen.classList.add("active");
    ui.showResult(scorePoint);
  }
};

const startTimer = () => {
  let lineWidth = 0;
  counter = setInterval(timer, questions[currentId].solveTime);
  function timer() {
    lineWidth += 0.5;
    ui.timeLine.style.width = lineWidth + "px";
    if (lineWidth > 510) {
      clearInterval(counter);
      playAudio("assets/wrong.mp3");
      localStorage.setItem("currentId", JSON.stringify(currentId + 1));
      let answer = questions[currentId].correctAnswer;
      for (let option of ui.optionList.children) {
        if (option.querySelector("span b").textContent === answer) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", ui.correctIcon);
        }
        option.classList.add("disabled");
        ui.nextButton.classList.add("show");
      }
    }
  }
};

const questionNum = (questionNum, totalQuestions) => {
  let tag = `<span class="badge">${questionNum}/${totalQuestions}</span>`;
  document.querySelector(".quiz-box .questionNumber").innerHTML = tag;
};

ui.nextButton.addEventListener("click", nextQuestion);

const optionSelected = (option) => {
  let answer = option.querySelector("span b").textContent;
  localStorage.setItem("currentId", JSON.stringify(currentId + 1));

  if (checkAnswer(answer)) {
    option.classList.add("correct");
    option.insertAdjacentHTML("beforeend", ui.correctIcon);
    playAudio("assets/correct.mp3");
    clearInterval(counter);
    score((scorePoint += 10));
  } else {
    option.classList.add("incorrect");
    playAudio("assets/wrong.mp3");
    clearInterval(counter);
    option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
  }

  for (let i = 0; i < ui.optionList.children.length; i++) {
    ui.optionList.children[i].classList.add("disabled");
  }

  ui.nextButton.classList.add("show");
};

ui.restartButton.addEventListener("click", () => {
  currentId = 0;
  scorePoint = 0;
  quiz.correctAnswer = 0;
  localStorage.removeItem("currentId");
  localStorage.removeItem("scorePoint");
  ui.startButton.click();
  ui.resultScreen.classList.remove("active");
});

if (
  parseInt(localStorage.getItem("currentId")) &&
  parseInt(localStorage.getItem("scorePoint"))
) {
  window.addEventListener("load", () => {
    ui.startButton.style.display = "none";
    let id = parseInt(localStorage.getItem("currentId"));
    let lastScore = parseInt(localStorage.getItem("scorePoint"));
    currentId = id;
    scorePoint = lastScore;
    ui.showQuestion(currentId);
    ui.quizBox.classList.add("active");
    startTimer(questions[currentId].solveTime);
    questionNum(questions[currentId].questionId, questions.length);
    score(scorePoint);
  });
} else {
  ui.startButton.addEventListener("click", () => {
    ui.quizBox.classList.add("active");
    ui.startButton.style.display = "none";
    ui.showQuestion(currentId);
    startTimer(questions[currentId].solveTime);
    questionNum(questions[currentId].questionId, questions.length);
    score(scorePoint);
  });
}
