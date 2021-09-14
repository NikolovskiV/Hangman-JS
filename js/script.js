// const wordList = ["Stockholm", "Berlin", "PHP", "Mall", "Volvo", "Vatten", "Academy", "Javascript"]; // Array: med spelets alla ord

const wordList = ["aaa"];

const imgList = [
    "images/h0.png",
    "images/h1.png",
    "images/h2.png",
    "images/h3.png",
    "images/h4.png",
    "images/h5.png",
    "images/h6.png",
  ];

let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let guessedLetters = [];
let guesses = 0;     // Number: håller antalet gissningar som gjorts
let guessesLeft = 6;
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) vid fel svar. t.ex. `/images/h1.png`
 
let msgHolderEl = document.querySelector('#message');     // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl = document.querySelector('#startGameBtn');  // DOM-nod: knappen som du startar spelet med
let letterButtonEls = document.querySelectorAll('#letterButtons button'); // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls = document.querySelectorAll('#letterBoxes ul li');    // Array av DOM-noder: Rutorna där bokstäverna ska stå
let letterBoxContainerEl = document.querySelector('#letterBoxes ul');
let letterButtonContainerEl = document.querySelector('ul#letterButtons');
let hangmanImgEl = document.querySelector('#hangman');
 
startGameBtnEl.addEventListener('click', initiateGame);
 
letterButtonContainerEl.addEventListener('click', guessLetter);
 
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function guessLetter(e) {
    if (e.target.tagName !== "BUTTON") {
        return;
    }
    console.log(e.target.value)
    guessedLetters.push(e.target.value);
    let guessedLetter = e.target.value;

    if (selectedWord.indexOf(guessedLetter) >= 0) {
    let letterUpdateArr = selectedWord.split("").map(function checkLetter(letter) {
        if (guessedLetters.indexOf(letter) >= 0) {
          return letter;
        } else {
          return " _ ";
        }
      });
      for (let i = 0; i < letterUpdateArr.length; i++) {
        letterBoxEls[i].firstElementChild.value = letterUpdateArr[i];
    }
} else {
    guesses = guesses + 1;
    setHangmanImg(guesses)
}
    //   console.log(letterUpdateArr);

 
    // const indexOfFirst = selectedWord.indexOf(guessedLetter);
    // console.log("first occurence at " + indexOfFirst)
    // if (indexOfFirst < 0) {
    //     guesses = guesses + 1;
    //     setHangmanImg(guesses)
    //     return;
    // } else {
    //     letterBoxEls[indexOfFirst].firstElementChild.value = guessedLetter;
    // }
    // const indexOfSecond = selectedWord.indexOf(guessedLetter, indexOfFirst + 1);
    // if (indexOfSecond < 0) {
    //     return;
    // } else {
    //     letterBoxEls[indexOfSecond].firstElementChild.value = guessedLetter;
    // }
    // console.log("second occurence at " + indexOfSecond)
}
 
// funktion som uppdaterar bilden som visas
function setHangmanImg (index) {
    hangmanImg = imgList[index];
    hangmanImgEl.setAttribute("src", hangmanImg);
 
}
 
 
// Funktion som slumpar fram ett ord
function randomWord (arr) {
    const randomNumber = Math.floor(Math.random() * arr.length)
    return arr[randomNumber]
}
 
// skriv en funktion som rensar letterBox-rutorna, dvs tar bort dem
function removeLB () {
    letterBoxContainerEl.innerHTML = ""
}
// skriv en funktion som genererar n antal tomma letterBoxrutor och stoppar in dem på rätt ställe
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumpas fram
function generateLB (amount) {
    // amount = det antal rutor vi vill generera.
    for (let i = 0; i < amount; i++) {
    let newLI = document.createElement('li');
    newLI.innerHTML = '<input type="text" disabled value="&nbsp;"/>';
    letterBoxContainerEl.appendChild(newLI);
    }
    letterBoxEls = document.querySelectorAll('#letterBoxes ul li');
}
 
// Funktion som inaktiverar/aktiverar bokstavsknapparna (beroende på vilken del av spelet du är på)
function activate () {
 
    for (let i = 0; i < letterButtonEls.length; i++) {
        letterButtonEls[i].disabled = false
    }
 
}
function deactivate () {
    for (let i = 0; i < letterButtonEls.length; i++) {
        letterButtonEls[i].disabled = true
    }
}
 
// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function initiateGame() {
    guesses = 0;
    selectedWord = randomWord(wordList).toUpperCase();
    let wordLength = selectedWord.length;
    activate();
    removeLB();
    generateLB(wordLength);
    setHangmanImg(0);  
}
 
 
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
 
