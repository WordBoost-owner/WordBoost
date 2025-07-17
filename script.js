
let words = [
  { word: "apple", uz: "olma", sentence: "I like eating an apple every day." },
  { word: "banana", uz: "banan", sentence: "Bananas are rich in potassium." }
];
let currentWord, guessedLetters = [], xp = 0, wrongGuesses = 0;

function startGame() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('hangman-game').style.display = 'block';
  xp = 0;
  nextWord();
}

function nextWord() {
  guessedLetters = [];
  wrongGuesses = 0;
  document.getElementById('hangman-image').src = 'images/hangman0.png';
  currentWord = words[Math.floor(Math.random() * words.length)];
  updateDisplay();
}

function updateDisplay() {
  const wordDisplay = currentWord.word.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
  document.getElementById('word-display').textContent = wordDisplay;
  document.getElementById('translation').textContent = 'Uzbek: ' + currentWord.uz;
  document.getElementById('example-sentence').textContent = 'Example: ' + currentWord.sentence;
  document.getElementById('xp').textContent = 'XP: ' + xp;
  renderLetters();
}

function renderLetters() {
  const container = document.getElementById('letters');
  container.innerHTML = '';
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i).toLowerCase();
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.disabled = guessedLetters.includes(letter);
    btn.onclick = () => guessLetter(letter);
    container.appendChild(btn);
  }
}

function guessLetter(letter) {
  guessedLetters.push(letter);
  if (currentWord.word.includes(letter)) {
    if (!currentWord.word.split('').some(l => !guessedLetters.includes(l))) {
      xp += 10;
      alert('Correct!');
    }
  } else {
    wrongGuesses++;
    if (wrongGuesses >= 6) {
      alert('Game over!');
    }
    document.getElementById('hangman-image').src = `images/hangman${wrongGuesses}.png`;
  }
  updateDisplay();
}

function goHome() {
  document.getElementById('hangman-game').style.display = 'none';
  document.getElementById('login-screen').style.display = 'block';
}
