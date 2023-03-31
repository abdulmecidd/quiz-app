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

const checkAnswer = (answer) => {
  return questions[currentId].correctAnswer === answer;
};

const nextQuestion = () => {
  if (currentId !== questions[8].questionId) {
    currentId++;
    ui.showQuestion(currentId);
    currentId;
    clearInterval(counter);
    localStorage.removeItem("counter");
    startTimer(questions[currentId].solveTime);
    questionNum(questions[currentId].questionId, questions.length);
    saveData();
  } else {
    localStorage.clear();
    ui.quizBox.classList.remove("active");
    ui.resultScreen.classList.add("active");
    ui.showResult(scorePoint);
  }
};
const startTimer = (time) => {
  let lineWidth = 0;
  counter = setInterval(timer, time);
  if (localStorage.getItem("counter")) {
    lineWidth = parseInt(localStorage.getItem("counter"));
    ui.timeLine.style.width = lineWidth + "%";
  }
  function timer() {
    lineWidth += 0.1;
    ui.timeLine.style.width = lineWidth + "%";
    localStorage.setItem("counter", lineWidth);
    if (lineWidth > 99.99) {
      clearInterval(counter);
      localStorage.removeItem("counter");
      playAudio("assets/wrong.mp3");
      localStorage.setItem("currentId", JSON.stringify(currentId + 1));
      let answer = questions[currentId].correctAnswer;
      for (let option of ui.optionList.children) {
        if (option.querySelector("span b").textContent === answer) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", ui.correctIcon);
          localStorage.setItem("currentId", JSON.stringify(currentId + 1));
          localStorage.setItem("scorePoint", JSON.stringify(scorePoint));
          localStorage.removeItem("counter");
        }
        option.classList.add("disabled");
        ui.nextButton.classList.add("show");
        localStorage.setItem("currentId", JSON.stringify(currentId + 1));
        localStorage.setItem("scorePoint", JSON.stringify(scorePoint));
        localStorage.removeItem("counter");
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
    localStorage.setItem("currentId", JSON.stringify(currentId + 1));
    localStorage.setItem("scorePoint", JSON.stringify(scorePoint));
    localStorage.removeItem("counter");
  } else {
    option.classList.add("incorrect");
    localStorage.setItem("currentId", JSON.stringify(currentId + 1));
    localStorage.setItem("scorePoint", JSON.stringify(scorePoint));
    playAudio("assets/wrong.mp3");
    clearInterval(counter);
    option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    localStorage.removeItem("counter");
  }

  for (let i = 0; i < ui.optionList.children.length; i++) {
    ui.optionList.children[i].classList.add("disabled");
  }

  ui.nextButton.classList.add("show");
};

ui.restartButton.addEventListener("click", () => {
  localStorage.clear();
  currentId = 0;
  scorePoint = 0;
  ui.resultScreen.classList.remove("active");
  ui.showQuestion(currentId);
  ui.quizBox.classList.add("active");
  startTimer(questions[currentId].solveTime);
  questionNum(questions[currentId].questionId, questions.length);
  score(scorePoint);
});

if (
  parseInt(localStorage.getItem("currentId")) &&
  parseInt(localStorage.getItem("scorePoint")) !== null
) {
  window.addEventListener("load", () => {
    ui.startButton.style.display = "none";
    ui.startScreen.style.display = "none";
    let id = parseInt(localStorage.getItem("currentId"));
    let lastScore = parseInt(localStorage.getItem("scorePoint"));
    currentId = id;
    scorePoint = lastScore;
    if (parseInt(localStorage.getItem("currentId")) === 10) {
      ui.quizBox.classList.remove("active");
      ui.resultScreen.classList.add("active");
      ui.showResult(scorePoint);
    }
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
    ui.startScreen.style.display = "none";
    localStorage.setItem("currentId", JSON.stringify(currentId + 1));
    ui.showQuestion(currentId);
    startTimer(questions[currentId].solveTime);
    questionNum(questions[currentId].questionId, questions.length);
    score(scorePoint);
  });
}
