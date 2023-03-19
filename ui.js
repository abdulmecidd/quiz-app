function UI() {
  (this.startButton = document.getElementById("startButton")),
    (this.quizBox = document.querySelector(".quiz-box")),
    (this.nextButton = document.querySelector(".nextButton")),
    (this.optionList = document.querySelector(".option_list")),
    (this.header = document.querySelector("header")),
    (this.correctIcon = `<div class="icon"><i class="fas fa-check"></i></div>`),
    (this.incorrectIcon =
      '<div class="icon"><i class="fas fa-times"></i></div>'),
    (this.scoreBoard = document.querySelector(".quiz-box header .scoreBoard")),
    (this.resultScreen = document.querySelector(".result")),
    (this.restartButton = document.querySelector(
      ".result footer .restart .restartButton"
    )),
    (this.resultBody = document.querySelector(".result .resultBody")),
    (this.timeLine = document.querySelector(".timeLine"));
}

UI.prototype.showQuestion = function (id) {
  let title = `<span> ${questions[id].questionTitle}`;
  let options = "";
  ui.nextButton.classList.remove("show");
  for (let i in questions[id].options) {
    options += `
      <div class="option">
                  <span id="answerOption"><b>${i}</b>: ${questions[id].options[i]}</span>
                </div>`;
  }

  document.querySelector(".question_text").innerHTML = title;
  ui.optionList.innerHTML = options;

  const option = ui.optionList.querySelectorAll(".option");

  for (let selectItem of option) {
    selectItem.setAttribute("onclick", "optionSelected(this)");
  }
};

UI.prototype.showResult = function (scorePoint) {
  let tag = `<i class="fas fa-star" aria-hidden="true"></i>${scorePoint}`;
  let person;
  let correctImg = ``;
  if (scorePoint === 100) {
    person = `<p class="whoAreU">Are you<b> Elon Musk?</b></p>`;
    correctImg = `<img src="assets/elonmusk.png" class="whoAreUImg" />`;
  } else if (scorePoint < 100 && scorePoint > 60) {
    correctImg = `<img src="assets/stevejobs.png" class="whoAreUImg" />`;
    person = `<p class="whoAreU">Are you<b> steve jobs?</b></p>`;
  } else if (scorePoint <= 60 && scorePoint >= 10) {
    correctImg = `<img src="assets/billgates.png" class="whoAreUImg" />`;
    person = `<p class="whoAreU">Are you<b> Bill Gates?</b></p>`;
  } else if (scorePoint === 0) {
    person = `<p class="whoAreU"> You should try <b> again. </b> 🥺`;
  }
  document.querySelector(".result header h1").innerHTML = tag;
  this.resultBody.innerHTML = `${person} ${correctImg}`;
};
