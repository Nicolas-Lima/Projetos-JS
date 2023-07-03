const letters = ["a", "b", "c", "d", "e"];
const question = {
  questionTitle: "",
  answers: {
    "a": "",
    "b": "",
    "c": "",
    "d": "",
    "e": ""
  },
  rightAnswerLetter: "",
  rightAnswerClickedBefore: false
}

const divAnswers = document.querySelector("#divAnswers");
let divAddAnswer = divAnswers.querySelector("#divAddAnswer");
let btnAddAnswer = divAnswers.querySelector("#addAnswer");

const divBtnAddImage = document.querySelector("#divAddImage");
const btnAddImage = divBtnAddImage.querySelector("#addImage");
btnAddImage.addEventListener("click", addImage);

function addImage() {
  question["image"] = {
    classes: {
      "mx-auto": true,
      "d-block": true,
      "mt": 5,
      "mb": 0,
    },
    imageName: "avenue.jpg",
    maxWidth: "100%"
  }
  
  const divImage = document.querySelector("#divImage");
  const imageOptions = document.querySelector("#imageOptions");
  const image = document.querySelector("#image");
  divImage.classList.toggle("d-none");
  imageOptions.classList.toggle("d-none");

  divAnswers.classList.remove("mt-5");
  const firstInputAnswer = document.querySelectorAll(`#divAnswers > #divAnswer`)[0];
  firstInputAnswer.classList.remove("mt-3");

  const divForm = document.querySelector("form");
  divForm.removeChild(divBtnAddImage);

  const mtOption = imageOptions.querySelector("#mtSize");
  const mbOption = imageOptions.querySelector("#mbSize");
  const imageSize = imageOptions.querySelector("#imageSize");
  const imageName = imageOptions.querySelector("#imageName");
  const centralizedOption = imageOptions.querySelector("#centralizedOption");
  centralizedOption.checked = true;

  mtOption.addEventListener("input", () => {
    let {value} = mtOption;

    if(value < 0) {
      mtOption.value = 0;
    }

    else if(value > 5) {
      mtOption.value = 5;
    }

    value = mtOption.value;
    question.image.classes.mt = value;
    
    image.classList.forEach(_class => {
      if(_class.includes("mt-")) {
        image.classList.remove(_class);
      }
    });
    
    image.classList.add(`mt-${value}`);
  });

  mbOption.addEventListener("input", () => {
    let {value} = mbOption;

    if(value < 0) {
      mbOption.value = 0;
    }

    else if(value > 5) {
      mbOption.value = 5;
    }

    value = mbOption.value;
    question.image.classes.mb = value;
    
    image.classList.forEach(_class => {
      if(_class.includes("mb-")) {
        image.classList.remove(_class);
      }
    });
    
    image.classList.add(`mb-${value}`);
  });

  imageSize.addEventListener("input", () => {
    const {value} = imageSize;

    if(value < 0) {
      imageSize.value = 0;
    }

    else if(value > 100) {
      imageSize.value = 100;
    }

    const imageSizeValue = `${imageSize.value}%`;
    image.style.maxWidth = imageSizeValue;
    
    question.image.maxWidth = imageSizeValue;
  });
  
  imageName.addEventListener("input", () => {
    imageName.addEventListener("blur", () => {
      const {value} = imageName;
      image.setAttribute("src", `imgs/${value}`);
      question.image.imageName = value;
    });
  });

  centralizedOption.addEventListener("click", () => {
    const isChecked = centralizedOption.checked === true;

    if(isChecked) {
      image.classList.toggle("mx-auto");
      question.image.classes["mx-auto"] = true;
    }

    else if(!isChecked) {
      image.classList.toggle("mx-auto");
      question.image.classes["mx-auto"] = false;
    }
  });
}

// Editing question

const questionTitle = document.querySelector("#question");
questionTitle.addEventListener("input", () => {
  const {value} = questionTitle;
  
  editQuestion(value);
});


function getOptionAndLetter() {
  let option = "";
  
  letter = letters[0];
  letterUpperCase = letter.toUpperCase();
  option += `<option value="${letter}" selected multiple>${letterUpperCase}</option>`;
  
  letters.splice(letter, 1);
  
  return {option, letter}
}

btnAddAnswer.addEventListener("click", () => {
  addAnswer();
});

function addAnswer() {
  const hasAnotherLetter = letters.length > 0;
  let option, letter;

	if(hasAnotherLetter) {
		const isTheLastLetter = letters.length == 1;
		const optionAndLetter = getOptionAndLetter();
		option = optionAndLetter.option;
		letter = optionAndLetter.letter;
		
		function createDivAnswer() {
  		const divAnswer = document.createElement("div");
  		divAnswer.classList.add("form-group", "d-flex", "mt-3", "align-items-center");
  		divAnswer.id = `divAnswer`;
  		
  	  const select = document.createElement("select");
  	  select.classList.add("form-select", "w-auto", "px-3", "text-primary");
  	  select.setAttribute("disabled", "");
  	  select.innerHTML = option;
  	  
  	  const inputAnswer = document.createElement("input");
  	  inputAnswer.type = "text";
  	  inputAnswer.classList.add("form-control", "ms-1", "answer");
  	  inputAnswer.setAttribute("letter", letter);
  	  inputAnswer.placeholder = "Resposta";
   	  
  	  divAnswer.appendChild(select);
  	  divAnswer.appendChild(inputAnswer);
  	  divAnswers.appendChild(divAnswer);
		}
		
		function createDivAddAnswer() {
		  const divAddAnswer = document.createElement("div");
		  divAddAnswer.classList.add("mt-3");
		  divAddAnswer.id = "divAddAnswer";
		  
		  const button = document.createElement("button");
		  button.classList.add("btn", "btn-primary");
		  button.id = "addAnswer";
		  
		  const svg = document.createElement("svg");
		  svg.classList.add("bi", "bi-plus-lg");
		  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		  svg.setAttribute("width", "16");
		  svg.setAttribute("height", "16");
		  svg.setAttribute("fill", "currentColor");
		  svg.setAttribute("viewBox", "0 0 16 16");
		  
		  const path = document.createElement("path");
		  path.setAttribute("fill-rule", "evenodd");
		  path.setAttribute("d", "M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z");
		  button.innerText = "Adicionar Resposta";
		  
      svg.appendChild(path);
      button.appendChild(svg);
      divAddAnswer.appendChild(button);
      divAnswers.appendChild(divAddAnswer);
		}
		
	  divAnswers.removeChild(divAddAnswer);
	  createDivAnswer();
	  if(!isTheLastLetter) {
	    createDivAddAnswer();
	    
  	  divAddAnswer = divAnswers.querySelector("#divAddAnswer");
  	  btnAddAnswer = divAnswers.querySelector("#addAnswer");
	  	
  	  btnAddAnswer.addEventListener("click", () => {
  	    addAnswer();
  	  });
	  }
	  
	  const selectRightAnswer = document.querySelector("#rightAnswer select");
	  selectRightAnswer.innerHTML += option.replace("selected multiple", "");
	  
	  // Editing answer
	  
	  const inputAnswers = document.querySelectorAll("div input.answer");
	  inputAnswers.forEach(inputAnswer => {
      inputAnswer.addEventListener("input", () => {
        const {value} = inputAnswer;
        const letter = inputAnswer.getAttribute("letter");
        
        editAnswer(letter, value);
      });
	  });
	  
	  // Editing the right answer.
	  
	  selectRightAnswer.addEventListener("change", () => {
	    const rightAnswerLetter = selectRightAnswer.value;
	    question["rightAnswerLetter"] = rightAnswerLetter;
	  });
	}
}

// Adding the answer "a" by default.
addAnswer();

// Copy to clipboard

const btnCopyToClipboard = document.querySelector("#copyToClipboard");
btnCopyToClipboard.addEventListener("click", () => {
  const copyText = document.createElement("textarea");
  copyText.innerHTML = JSON.stringify(question, null, 2);
  copyText.classList.add("d-none");
  document.body.appendChild(copyText);
  
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerText + ",");
  
  document.body.removeChild(copyText);
});

// Function to edit question and answer and edit the right answer
 
function editQuestion(value) {
  question["questionTitle"] = value    ;
}

function editAnswer(letter, answer) {
  question["answers"][letter] = answer;
}

function editRightAnswer(rightAnswerLetter) {
  question = {rightAnswerLetter}
}
