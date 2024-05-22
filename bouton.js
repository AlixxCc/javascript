// bouton quizz
function demarrerQuizz() {
    const demarrerButton = document.getElementById("demarrer-button");
    const quizContainer = document.getElementById("quiz-container");
    const timerElement = document.getElementById("timer");
  
    timerElement.style.display = "block";
  
    
    demarrerButton.style.display = "none"; 
  
    
    quizContainer.style.display = "block"; 
  
    afficherQuestion();  
  }

const questions = [
  {
    question: "1. Quelle est la langue officielle du Burundi?",
    options: ["Kirundi", "Français", "Swahili", "Anglais"],
    correctAnswer: 1
  },
  {
    question: "2. Quel est le nom du lac situé à la frontière nord-est du Burundi? ",
    options: ["Lac Kivu", "Lac Malawi", "Lac Tanganyika", "Lac Victoria"],
    correctAnswer: 1
  },

{
  question: "3. Quel est le président actuel du Burundi en 2024 ?",
  options: ["Pierre Nkurunziza", "Evariste Ndayishimiye", "Pierre Buyoya", "Domitien Ndayizeye"],
  correctAnswer: 1
},

{
  question: "4. Quel est le principal produit d'exportation du Burundi ?",
  options: ["Café", "Thé", "Coton", "Banane"],
  correctAnswer: 1
},

{
  question: "5. Quelle est la principale religion pratiquée au Burundi ?",
  options: ["Christianisme", "Islam", "Hindouisme", "Bouddhisme"],
  correctAnswer: 0
},
{
  question: "6. Quel est le nom de la fête nationale du Burundi célébrée le 1er juillet ?",
  options: ["Fête de l'Indépendance", "Fête de la Révolution", "Fête du Travail", "Fête de l'Unité"],
  correctAnswer: 0
},

{
  question: "7. Quel est le code téléphonique international du Burundi ?",
  options: ["+254", "+256", "+257", "+258"],
  correctAnswer: 2
},
{
  question: "8. Quel est le pays voisin du Burundi au nord ?",
  options: ["La Tanzanie", "Le Rwanda", "L'Ouganda", "Le Kenya"],
  correctAnswer: 1
},
{
  question: "9. Quel est le nom du stade national situé à Bujumbura, la capitale du Burundi ?",
  options: ["Stade Intwari", "Stade Urukundo", "Stade Umuganda", "Stade Amahoro"],
  correctAnswer: 0
},

{
  question: "10. Le Burundi a obtenu son indépendance de quelle puissance coloniale ?",
  options: ["La France", "La Belgique", "Le Royaume-Uni", "L'Allemagne"],
  correctAnswer: 1

}];

let currentQuestion = 0;
let score = 0;
let answers = [];
let timer;

function afficherQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const timerElement = document.getElementById("timer");

  if (timer) {
    clearInterval(timer);     
  }

  questionElement.textContent = questions[currentQuestion].question;

  optionsElement.innerHTML = "";
  for (let i = 0; i < questions[currentQuestion].options.length; i++) {
    const option = document.createElement("button");
    option.textContent = questions[currentQuestion].options[i];
    option.addEventListener("click", () => choisirReponse(i));
    optionsElement.appendChild(option);
  }

  let seconds = 10;
  timerElement.textContent = seconds;
  timer = setInterval(() => {
    seconds--;
    timerElement.textContent = seconds;

    if (seconds === 0) {
      clearInterval(timer);
      choisirReponse(-1); 
    }
  }, 1000);
}

function choisirReponse(index) {
  const selectedOption = document.getElementsByTagName("button")[index];

  const options = document.getElementsByTagName("button");
  for (let i = 0; i < options.length; i++) {
    options[i].disabled = true;
  }

  clearInterval(timer);

  if (index === questions[currentQuestion].correctAnswer) {
    selectedOption.classList.add("correct");
    score++;
  } else if (index !== -1) {
    selectedOption.classList.add("incorrect");
  }

  answers.push({
    question: questions[currentQuestion].question,
    selectedAnswer: index,
    correctAnswer: questions[currentQuestion].correctAnswer
  });

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      afficherQuestion();
    } else {
      afficherResultats();
    }
  }, 1000);
}

function afficherResultats() {
  const quizContainer = document.getElementById("quiz-container");
  const resultsContainer = document.getElementById("results");

  quizContainer.style.display = "none";

  let resultsHTML = "<h3>Résultats :</h3>";
  resultsHTML += "<h3>Points obtenus: " + score + "/" + questions.length + "</h3>";

  for (let i = 0; i < answers.length; i++) {
    const question = answers[i].question;
    const selectedAnswer = answers[i].selectedAnswer;
    const correctAnswer = answers[i].correctAnswer;

    let answerStatus = "";
    if (selectedAnswer === correctAnswer) {
      answerStatus = "Correct";
    } else {
      answerStatus = "Incorrect (La réponse correcte était : " + questions[i].options[correctAnswer] + ")";
    }

    resultsHTML += "<p><strong>Question :</strong> " + question + "</p>";
    resultsHTML += "<p><strong>Réponse :</strong> " + questions[i].options[selectedAnswer] + "</p>";
    resultsHTML += "<p><strong>Statut :</strong> " + answerStatus + "</p>";
    resultsHTML += "<hr>";
  }


  resultsContainer.innerHTML = resultsHTML;
  resultsContainer.style.display = "block";
}

