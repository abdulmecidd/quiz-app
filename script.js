const ui = new UI();

let scorePoint = 0;
let counter;
let currentId;
let order = 1;

const saveData = () => {
  localStorage.setItem("currentId", JSON.stringify(currentId));
  localStorage.setItem("scorePoint", JSON.stringify(scorePoint));
};

const uploadQuestions = () => {
  let possibleQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    possibleQuestions.push(questions[i].questionId);
  }
  localStorage.setItem("possibleQuestions", JSON.stringify(possibleQuestions));
  for (let i; i < possibleQuestions.length; i++) {
    order++;
  }
};

const playAudio = (url) => {
  new Audio(url).play();
};
const showCorrectAnswer = () => {
  for (let option of ui.optionList.children) {
    if (
      option.querySelector("span b").textContent ===
      questions[currentId].correctAnswer
    ) {
      option.classList.add("correct");
      option.insertAdjacentHTML("beforeend", ui.correctIcon);
    }
  }
};

const createRandomQuestions = () => {
  let possibleQuestions =
    JSON.parse(localStorage.getItem("possibleQuestions")) || [];
  const randomIdIndex = Math.floor(Math.random() * possibleQuestions.length);
  currentId = possibleQuestions[randomIdIndex];
  possibleQuestions.splice(randomIdIndex, 1);
  localStorage.setItem("possibleQuestions", JSON.stringify(possibleQuestions));
};

const score = (score) => {
  let tag = `<span class="score"><i class="fas fa-star" aria-hidden="true"></i> ${score}</span>`;
  ui.scoreBoard.innerHTML = tag;
};

const checkAnswer = (answer) => {
  return questions[currentId].correctAnswer === answer;
};

const nextQuestion = () => {
  if (order !== 11) {
    ui.showQuestion(currentId);
    clearInterval(counter);
    localStorage.removeItem("counter");
    startTimer(questions[currentId].solveTime);
    questionNum(order++, questions.length);
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
      createRandomQuestions();
      localStorage.setItem("currentId", JSON.stringify(currentId));
      let answer = questions[currentId].correctAnswer;
      for (let option of ui.optionList.children) {
        if (option.querySelector("span b").textContent === answer) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", ui.correctIcon);
          localStorage.setItem("currentId", JSON.stringify(currentId));
          localStorage.setItem("scorePoint", JSON.stringify(scorePoint));
          localStorage.setItem("order", JSON.stringify(order));
          localStorage.removeItem("counter");
        }
        option.classList.add("disabled");
        ui.nextButton.classList.add("show");
        localStorage.setItem("currentId", JSON.stringify(currentId));
        localStorage.setItem("scorePoint", JSON.stringify(scorePoint));
        localStorage.setItem("order", JSON.stringify(order));
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
    createRandomQuestions();
    localStorage.setItem("currentId", JSON.stringify(currentId));
    localStorage.setItem("scorePoint", JSON.stringify(scorePoint));
    localStorage.setItem("order", JSON.stringify(order));

    localStorage.removeItem("counter");
  } else {
    option.classList.add("incorrect");
    showCorrectAnswer();
    createRandomQuestions();
    localStorage.setItem("currentId", JSON.stringify(currentId));
    localStorage.setItem("scorePoint", JSON.stringify(scorePoint));
    localStorage.setItem("order", JSON.stringify(order));

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
  uploadQuestions();
  createRandomQuestions();
  scorePoint = 0;
  order = 1;
  saveData();
  ui.resultScreen.classList.remove("active");
  ui.showQuestion(currentId);
  ui.quizBox.classList.add("active");
  startTimer(questions[currentId].solveTime);
  questionNum(order++, questions.length);
  score(scorePoint);
});

if (
  parseInt(localStorage.getItem("currentId")) === 0 ||
  (parseInt(localStorage.getItem("currentId")) &&
    parseInt(localStorage.getItem("scorePoint")) !== null)
) {
  window.addEventListener("load", () => {
    ui.startButton.style.display = "none";
    ui.startScreen.style.display = "none";
    let id = parseInt(localStorage.getItem("currentId"));
    let lastScore = parseInt(localStorage.getItem("scorePoint"));
    let lastOrder = parseInt(localStorage.getItem("order"));
    possibleQuestions = parseInt(localStorage.getItem("possibleQuestions"));
    currentId = id;
    scorePoint = lastScore;
    order = lastOrder;
    ui.showQuestion(currentId);
    ui.quizBox.classList.add("active");
    startTimer(questions[currentId].solveTime);
    questionNum(order, questions.length);
    score(scorePoint);
  });
} else {
  ui.startButton.addEventListener("click", () => {
    ui.quizBox.classList.add("active");
    ui.startButton.style.display = "none";
    ui.startScreen.style.display = "none";
    scorePoint = 0;
    uploadQuestions();
    createRandomQuestions();
    ui.showQuestion(currentId);
    localStorage.setItem("currentId", JSON.stringify(currentId));
    localStorage.setItem("order", JSON.stringify(order));
    localStorage.setItem("scorePoint", JSON.stringify(scorePoint));
    startTimer(questions[currentId].solveTime);
    questionNum(order++, questions.length);
    score(scorePoint);
  });
}
