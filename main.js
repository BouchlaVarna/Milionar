//Function for fetching data from a json, returns object
function fetchQnA(i) {
  let qna = {
    "question": "",
    "correctA": "",
    "incorrectA1": "",
    "incorrectA2": "",
    "incorrectA3": ""
  };

  fetch("qna.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    for (let key in data["qna"][`qna${i}`]) {
      qna[key] = data["qna"][`qna${i}`][key];
    }
  })

  return qna;
}



let qnaMainOBJ = fetchQnA(1)