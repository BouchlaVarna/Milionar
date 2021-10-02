let answers = document.querySelectorAll('.answers > *');
let question = document.querySelector('.question');
let prizes = document.querySelectorAll('.moneyCheck > *');
let fiftyFifty = document.querySelector('.fiftyFifty');
let questsAndAns = [];
let currentPrize = prizes.length;
let questionValue = "";
let answersUsed = [0];
let answersOnly = [];
let won = false;

const jsonToArray = (i) => {
  j = 0;
  let fetchQnA = async (i) => {
    fetchFile = await fetch('qna.json');
    let data = await fetchFile.json();
  
    createQnA(data, i);
  }
  
  fetchQnA(i);
  
  let createQnA = (data, i) => {
    for (const key in data["qna"][`qna${i}`]) {
      questsAndAns[j] = (data["qna"][`qna${i}`][key]);
      j++;
    }
  }
}

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const checkIfUsed = (min, max) => {
  let num = randomNum(min, max);
  for (let i = 0; i < answersUsed.length; i++) {
    if(num == answersUsed[i]){
      num = randomNum(min, max);
      i = 0;
    }
  }
  answersUsed.push(num)
  return num;
}

let qnaGen = () => {
  for (let i = 0; i < answers.length; i++) {
    answersOnly[i] = answers[i];
  }
  shuffleArray(answersOnly);
  for (let i = 0; i < answersOnly.length; i++) {
    answersOnly[i].innerText = questsAndAns[i];
  }
  questionValue = questsAndAns[0]
  question.innerText = questsAndAns[4];
}

let checkAnswer = (answer, correctAnswer) => {
  jsonToArray(checkIfUsed(1, 10));
  qnaGen();
  if(answer == correctAnswer){
    currentPrize--;
    prizes[currentPrize].style.backgroundColor = 'blue';
    return;
  }
  resetGame();
}

let resetGame = () => {
  answersUsed = [0];
  currentPrize = prizes.length;
  prizes.forEach(element => {
    element.style.backgroundColor = ''
  });
}

let winningConditionCheck = () => {
  let winningNum = 9
  if(!won) { winningNum = 10 };
  if(answersUsed.length >= winningNum){
    question.innerText = 'Vyhral jsi';
    won = true;
    setTimeout(function(){
      resetGame();
      qnaGen();
    },
    500)
  }
}

let shuffleArray = (arr) => {
  arr.sort(() => Math.random() - 0.5);
}

answers.forEach(element => {
  element.onclick = () => {
    checkAnswer(element.innerText, questionValue);
    winningConditionCheck();  
  }
});

window.onload = qnaGen, jsonToArray(checkIfUsed(1, 10)); 
