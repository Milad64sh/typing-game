const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

let randomWord;
let score = 0;
let time = 10;

// set difficulty to ls or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// set diffi select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';
text.focus();
const timeInterval = setInterval(updateTime, 1000);

// get random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
// update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
// update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';
  if (time === 0) {
    clearInterval(timeInterval);
    // end the game
    gameOver();
  }
}
// game Over, show end screen
function gameOver() {
  endGameEl.innerHTML = `
 <h1>Time ran out</h1>
 <p>Your final score is : ${score}</p>
 <button onclick="location.reload()">Reload</button>
 `;
  endGameEl.style.display = 'flex';
}

// add random word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addWordToDOM();

// event listeners
// typing
text.addEventListener('input', (e) => {
  const insertedWord = e.target.value;
  if (insertedWord === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = '';
    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});
// settings
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});
// settings select
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
