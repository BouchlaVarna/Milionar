let answers = document.querySelectorAll('.answers > *');
let question = document.querySelector('.question');
let prizes = document.querySelectorAll('.moneyCheck > *');
let fiftyFifty = document.querySelector('.fiftyFifty');
let questsAndAns = [];
let currentPrize = prizes.length;
let hiddenVariable = "";
let answersUsed = [0];

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
  console.log(answersUsed)
  answersUsed.push(num)
  return num;
}

let qnaGen = () => {
  for (let i = 0; i < answers.length; i++) {
    answers[i].innerText = questsAndAns[i];
  }
  hiddenVariable = questsAndAns[0]
  question.innerText = questsAndAns[4];
}

let checkAnswer = (answer, correctAnswer) => {
  jsonToArray(checkIfUsed(1, 3));
  qnaGen();
  if(answer == correctAnswer){
    currentPrize--;
    prizes[currentPrize].style.backgroundColor = 'blue';
    return;
  }
  resetGame();
}

let resetGame = () => {
  answersUsed = [];
  currentPrize = prizes.length;
  prizes.forEach(element => {
    element.style.backgroundColor = ''
  });
}

let winningCondition = () => {
  
}

answers.forEach(element => {
  element.onclick = () => {
    checkAnswer(element.innerText, hiddenVariable)
  }
});

window.onload = qnaGen, jsonToArray(checkIfUsed(1, 3)); 
