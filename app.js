let listOfDrawnNumbers = [];
let limitNumber = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;

function displayTextOnScreen(tag, text) {
  let field = document.querySelector(tag);
  field.innerHTML = text;
  responsiveVoice.speak(text, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function displayInitialMessage() {
  displayTextOnScreen('h1', 'Jogo do número secreto');
  displayTextOnScreen('p', 'Escolha um número entre 1 e 10');
}

displayInitialMessage();

function checkGuess() {
  let guess = document.querySelector('input').value;

  if (guess == secretNumber) {
    displayTextOnScreen('h1', 'Acertou!');

    let wordAttempt = attempts > 1 ? 'tentativas' : 'tentativa';
    let messageAttempts = `Você descobriu o número secreto com ${attempts} ${wordAttempt}!`;
    displayTextOnScreen('p', messageAttempts);
    document.getElementById('restart').removeAttribute('disabled');
  } else {
    if (guess > secretNumber) {
      displayTextOnScreen('p', 'O número secreto é menor');
      clearField();
    } else {
      displayTextOnScreen('p', 'O número secreto é maior');
      clearField();
    }
    attempts++;
  }
}

function generateRandomNumber() {
  let chosenNumber = parseInt(Math.random() * limitNumber + 1);
  let quantityOfElementsInthelist = listOfDrawnNumbers.length;

  if (quantityOfElementsInthelist == limitNumber) {
    listOfDrawnNumbers = [];
  }

  if (listOfDrawnNumbers.includes(chosenNumber)) {
    return generateRandomNumber();
  } else {
    listOfDrawnNumbers.push(chosenNumber);

    return chosenNumber;
  }
}

function clearField() {
  guess = document.querySelector('input');
  guess.value = '';
}

function restartGame() {
  secretNumber = generateRandomNumber();
  clearField();
  attempts = 1;
  displayInitialMessage();
  console.log(document.getElementById('restart'));
  document.getElementById('restart').setAttribute('disabled', true);
  console.log(document.getElementById('restart'));
}
