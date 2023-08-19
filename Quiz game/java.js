
var quiz = {
   "JS": [
   {
   "id": 1,
   "question": "Prior to 2011, which was the last year in which a woman attempted to qualify for a Grand Prix?",
   "options": [
   {
   "a": "1968",
   "b": "1992",
   "c": "2003",
   "d": "1981"
   }
   ],
   "answer": "1992",
   "score": 0,
   "status": ""
   },
   {
   "id": 2,
   "question": "What number car did Yuji Ide drive in the 2006 Australian Grand Prix?",
   "options": [
   {
   "a": "23",
   "b": "24",
   "c": "17",
   "d": "11"
   }
   ],
   "answer": "23",
   "score": 0,
   "status": ""
   },
   {
   "id": 3,
   "question": "Which of these won the 1950 Formula One World Drivers' Championship?",
   "options": [
   {
   "a": "Juan Manuel Fangio",
   "b": "Luigi Fagioli",
   "c": "Louis Rosler",
   "d": "Giuseppe Farina"
   }
   ],
   "answer": "Giuseppe Farina",
   "score": 0,
   "status": ""
   },
   {
   "id": 4,
   "question": "Which team holds the record for winning the most Constructors' Championships in the history of Formula 1?",
   "options": [
   {
   "a": "Williams",
   "b": "McLaren",
   "c": "Mercedes",
   "d": "Ferrari"
   }
   ],
   "answer": "Ferrari",
   "score": 0,
   "status": ""
   },
   {
   "id": 5,
   "question": "Complete the name of this famous Formula One Driver. 'Kimi______'.",
   "options": [
   {
   "a": "Piquet",
   "b": "Lauda",
   "c": "Hill",
   "d": "Raikkonen",
   }
   ],
   "answer": "Raikkonen",
   "score": 0,
   "status": ""
   }
   ]
   }
   var quizApp = function () {
   this.score = 0;
   this.qno = 1;
   this.currentque = 0;
   var totalque = quiz.JS.length;
   this.displayQuiz = function (cque) {
   this.currentque = cque;
   if (this.currentque < totalque) {
   $("#tque").html(totalque);
   $("#previous").attr("disabled", false);
   $("#next").attr("disabled", false);
   $("#qid").html(quiz.JS[this.currentque].id + '.');
   $("#question").html(quiz.JS[this.currentque].question);
   $("#question-options").html("");
   for (var key in quiz.JS[this.currentque].options[0]) {
   if (quiz.JS[this.currentque].options[0].hasOwnProperty(key)) {
   $("#question-options").append(
   "<div class='form-check option-block'>" +
   "<label class='form-check-label'>" +
   "<input type='radio' class='form-check-input' name='option' id='q" + key + "' value='" + quiz.JS[this.currentque].options[0][key] + "'><span id='optionval'>" +
   quiz.JS[this.currentque].options[0][key] +
   "</span></label>"
   );
   }
   }
   }
   if (this.currentque <= 0) {
   $("#previous").attr("disabled", true);
   }
   if (this.currentque >= totalque) {
   $('#next').attr('disabled', true);
   for (var i = 0; i < totalque; i++) {
   this.score = this.score + quiz.JS[i].score;
   }
   return this.showResult(this.score);
   }
   }
   this.showResult = function (scr) {
   $("#result").addClass('result');
   $("#result").html("<h1 class='res-header'>Total Score: &nbsp;" + scr + '/' + totalque + "</h1>");
   for (var j = 0; j < totalque; j++) {
   var res;
   if (quiz.JS[j].score == 0) {
   res = '<span class="wrong">' + quiz.JS[j].score + '</span><i class="fa fa-remove c-wrong"></i>';
   } else {
   res = '<span class="correct">' + quiz.JS[j].score + '</span><i class="fa fa-check c-correct"></i>';
   }
   $("#result").append(
   '<div class="result-question"><span>Q ' + quiz.JS[j].id + '</span> &nbsp;' + quiz.JS[j].question + '</div>' +
   '<div><b>Correct answer:</b> &nbsp;' + quiz.JS[j].answer + '</div>' +
   '<div class="last-row"><b>Score:</b> &nbsp;' + res +
   '</div>'
   );
   }
   }
   this.checkAnswer = function (option) {
   var answer = quiz.JS[this.currentque].answer;
   option = option.replace(/</g, "&lt;") //for <
   option = option.replace(/>/g, "&gt;") //for >
   option = option.replace(/"/g, "&quot;")
   if (option == quiz.JS[this.currentque].answer) {
   if (quiz.JS[this.currentque].score == "") {
   quiz.JS[this.currentque].score = 1;
   quiz.JS[this.currentque].status = "correct";
   }
   } else {
   quiz.JS[this.currentque].status = "wrong";
   }
   }
   this.changeQuestion = function (cque) {
   this.currentque = this.currentque + cque;
   this.displayQuiz(this.currentque);
   }
   }
   var jsq = new quizApp();
   var selectedopt;
   $(document).ready(function () {
   jsq.displayQuiz(0);
   $('#question-options').on('change', 'input[type=radio][name=option]', function (e) {
   //var radio = $(this).find('input:radio');
   $(this).prop("checked", true);
   selectedopt = $(this).val();
   });
   });
   $('#next').click(function (e) {
   e.preventDefault();
   if (selectedopt) {
   jsq.checkAnswer(selectedopt);
   }
   jsq.changeQuestion(1);
   });
   $('#previous').click(function (e) {
   e.preventDefault();
   if (selectedopt) {
   jsq.checkAnswer(selectedopt);
   }
   jsq.changeQuestion(-1);
   });