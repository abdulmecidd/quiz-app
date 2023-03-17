function UI() {
  (this.startButton = document.getElementById("startButton")),
    (this.quizBox = document.querySelector(".quiz-box")),
    (this.nextButton = document.querySelector(".nextButton")),
    (this.optionList = document.querySelector(".option_list")),
    (this.header = document.querySelector("header")),
    (this.correctIcon = `<div class="icon"><i class="fas fa-check"></i></div>`),
    (this.incorrectIcon =
      '<div class="icon"><i class="fas fa-times"></i></div>'),
    (this.scoreBoard = document.querySelector(".quiz-box header .scoreBoard"));
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
