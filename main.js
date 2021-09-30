//Function for fetching data from a json, returns object
function fetchQnA(i) {
  let qna = [];

  fetch("qna.json")
  .then(function (res) {return res.json();})
  .then(function (data) {
    let j = 0;
    for (let key in data["qna"][`qna${i}`]) {
      qna[j] = data["qna"][`qna${i}`][key];
      j++;
    }
  })

  return qna;
}

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let answers = document.querySelectorAll('.answers > *');
let question = document.querySelector('.question');
let prizes = document.querySelectorAll('.moneyCheck > *');
let fiftyFifty = document.querySelector('.fiftyFifty');

console.log(fetchQnA(1))

window.onload = () => {
  qna = fetchQnA(1);
  for (let i = 0; i < answers.length; i++) {
    console.log('negr')
    answers[i].innerText = qna[i];
  }
}