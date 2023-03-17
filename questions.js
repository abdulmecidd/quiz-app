function Question(questionId, questionTitle, options, correctAnswer) {
  this.questionId = questionId;
  this.questionTitle = questionTitle;
  this.options = options;
  this.correctAnswer = correctAnswer;
}

let questions = [
  new Question(
    1,
    "Which one is Javascript package management application?",
    { a: "Node.js", b: "Typescript", c: "Npm", d: "Nuget" },
    "c"
  ),
  new Question(
    2,
    "Which of the following is a popular front-end framework for building user interfaces in JavaScript?",
    { a: "AngularJS", b: "jQuery", c: "Ruby on Rails", d: "Django" },
    "a"
  ),
  new Question(
    3,
    "Which JavaScript library is commonly used for data visualization?",
    { a: "D3.js", b: "Bootstrap", c: "Ember.js", d: "React.js" },
    "a"
  ),
  new Question(
    4,
    "Which of the following is a JavaScript runtime built on Chrome's V8 JavaScript engine?",
    { a: "Node.js", b: "Express.js", c: "Ruby on Rails", d: "Django" },
    "c"
  ),
  new Question(
    5,
    "Which JavaScript framework is known for its two-way data binding and MVVM architecture?",
    { a: "AngularJS", b: "React.js", c: "Vue.js", d: "Backbone.js" },
    "c"
  ),
  new Question(
    6,
    "Which of the following is a JavaScript package manager and registry?",
    { a: "npm", b: "RubyGems", c: "NuGet", d: "PyPI" },
    "c"
  ),
  new Question(
    7,
    "Which of the following is a JavaScript testing framework?",
    { a: "Jest", b: "Jasmine", c: "mocha", d: "Karma" },
    "c"
  ),
  new Question(
    8,
    "Which JavaScript library is commonly used for manipulating the Document Object Model (DOM)?",
    { a: "jQuery", b: "AngularJS", c: "React.js", d: "Vue.js" },
    "c"
  ),
  new Question(
    9,
    "Which of the following is a popular code editor for JavaScript development?",
    {
      a: "Visual Studio Code",
      b: "Atom",
      c: "Sublime Text",
      d: "IntelliJ IDEA",
    },
    "c"
  ),
  new Question(
    10,
    "Which JavaScript library is known for its functional programming style and immutable data structures?",
    { a: "Lodash", b: "Underscore.js", c: "Immutable.js", d: "Ramda" },
    "c"
  ),
];
