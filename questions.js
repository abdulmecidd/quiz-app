function Question(
  questionId,
  questionTitle,
  options,
  correctAnswer,
  solveTime
) {
  this.questionId = questionId;
  this.questionTitle = questionTitle;
  this.options = options;
  this.correctAnswer = correctAnswer;
  this.solveTime = solveTime;
}

let questions = [
  new Question(
    0,
    "Which of the following is a popular front-end framework for building user interfaces in JavaScript?",
    { a: "AngularJS", b: "jQuery", c: "React.js", d: "Vue.js" },
    "c",
    10
  ),
  new Question(
    1,
    "What is the output of the following JavaScript code?\n\nconsole.log('5' + 5 - 2);",
    { a: "52", b: "3", c: "53", d: "NaN" },
    "d",
    10
  ),
  new Question(
    2,
    "Which of the following is a JavaScript library commonly used for data visualization?",
    { a: "D3.js", b: "Bootstrap", c: "Ember.js", d: "React.js" },
    "a",
    10
  ),
  new Question(
    3,
    "Which of the following is a JavaScript runtime built on Chrome's V8 JavaScript engine?",
    { a: "Node.js", b: "Express.js", c: "Ruby on Rails", d: "Django" },
    "a",
    10
  ),
  new Question(
    4,
    "Which JavaScript framework is known for its two-way data binding and MVVM architecture?",
    { a: "AngularJS", b: "React.js", c: "Vue.js", d: "Backbone.js" },
    "a",
    10
  ),
  new Question(
    5,
    "Which of the following is a JavaScript package manager and registry?",
    { a: "npm", b: "RubyGems", c: "NuGet", d: "PyPI" },
    "a",
    10
  ),
  new Question(
    6,
    "Which of the following is a JavaScript testing framework?",
    { a: "Jest", b: "Jasmine", c: "Mocha", d: "Karma" },
    "c",
    10
  ),
  new Question(
    7,
    "Which JavaScript library is commonly used for manipulating the Document Object Model (DOM)?",
    { a: "jQuery", b: "AngularJS", c: "React.js", d: "Vue.js" },
    "a",
    10
  ),
  new Question(
    8,
    "Which of the following is a popular code editor for JavaScript development?",
    {
      a: "Visual Studio Code",
      b: "Atom",
      c: "Sublime Text",
      d: "IntelliJ IDEA",
    },
    "a",
    10
  ),
  new Question(
    9,
    "Which JavaScript library is known for its functional programming style and immutable data structures?",
    { a: "Lodash", b: "Underscore.js", c: "Immutable.js", d: "Ramda" },
    "c",
    10
  ),
];
