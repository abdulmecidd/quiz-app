const ui = new UI();
let currentId = 0;
let scorePoint = 0;

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
  }
};

const questionNum = (questionNum, totalQuestions) => {
  let tag = `<span class="badge">${questionNum}/${totalQuestions}</span>`;
  document.querySelector(".quiz-box .questionNumber").innerHTML = tag;
};

ui.startButton.addEventListener("click", () => {
  ui.quizBox.classList.add("active");
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
