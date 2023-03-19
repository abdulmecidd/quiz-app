const ui = new UI();
const quiz = new Question(questions);

let currentId = 0;
let scorePoint = 0;

const playAudio(url) {
  new Audio(url).play();
}

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
    questionNum(questions[currentId].questionId, questions.length);
  } else {
    ui.quizBox.classList.remove("active");
    ui.resultScreen.classList.add("active");
    ui.showResult(scorePoint);
  }
};

const questionNum = (questionNum, totalQuestions) => {
  let tag = `<span class="badge">${questionNum}/${totalQuestions}</span>`;
  document.querySelector(".quiz-box .questionNumber").innerHTML = tag;
};

ui.startButton.addEventListener("click", () => {
  ui.quizBox.classList.add("active");
  ui.startButton.style.display = "none";
  ui.showQuestion(currentId);
  questionNum(questions[currentId].questionId, questions.length);
  score(scorePoint);
});

ui.nextButton.addEventListener("click", nextQuestion);

const optionSelected = (option) => {
  let answer = option.querySelector("span b").textContent;

  if (checkAnswer(answer)) {
    option.classList.add("correct");
    option.insertAdjacentHTML("beforeend", ui.correctIcon);
    score((scorePoint += 10));
  } else {
    option.classList.add("incorrect");
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
  ui.startButton.click();
  ui.resultScreen.classList.remove("active");
});
