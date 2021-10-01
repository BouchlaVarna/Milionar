let answers = document.querySelectorAll('.answers > *');
let question = document.querySelector('.question');
let prizes = document.querySelectorAll('.moneyCheck > *');
let fiftyFifty = document.querySelector('.fiftyFifty');
let questsAndAns = [];
let j = 0;

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

let qnaGen = () => {
  for (let i = 0; i < answers.length; i++) {
    answers[i].innerText = questsAndAns[i];
  }
  question.innerText = questsAndAns[4];
}

let checkAnswer = (answer, correctAnswer) => {
  jsonToArray(randomNum(1, 3))
  qnaGen();
}

answers.forEach(element => {
  element.onclick = () => {
    checkAnswer(element.innerText, questsAndAns[0])
  }
});

window.onload = qnaGen, jsonToArray(randomNum(1, 3)); 
