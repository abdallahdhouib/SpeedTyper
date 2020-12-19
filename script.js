const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
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
  'absolutely',
];

//init word,score,time

let randomWord
let score=0;
let time=10;
let x=5;
let v= localStorage.getItem('difficulty')!==null? localStorage.getItem('difficulty'): 'medium';

//set difficultySelect useDebugValue(

difficultySelect.value = localStorage.getItem('difficulty')!==null? localStorage.getItem('difficulty'): 'medium';

//focus on text on start
text.focus();
//start counting down 
const timeInterval = setInterval(updateTime, 1000);
//generate random word from array

function getRandomWord (){
 return words[Math.floor(Math.random()*words.length)];
}
//add word to dom

function addWordToDOM(){
 randomWord =getRandomWord();
 word.innerHTML = randomWord.toUpperCase();
}
function updateScore(){
 score++
scoreEl.innerHTML=score;
}
function updateTime(){
 time --
 timeEl.innerHTML = time +'s'

 if(time===0){
  clearInterval(timeInterval);
  //endgame
  gameOver()
 }
}
//game over show end screen 

function gameOver(){
 endgameEl.innerHTML = `<h1>Time run out</h1>
 <p>Your final Score is ${score} in ${v.toUpperCase()} mode</p>
 <button onclick="location.reload()">Reload</button> `
 endgameEl.style.display='flex'
}

addWordToDOM();
//event listeners
text.addEventListener('input', e =>{
 const insertedText = e.target.value;
 if (insertedText.toUpperCase()===randomWord.toUpperCase()){
  addWordToDOM();
  updateScore();
  
   //clear
   e.target.value='';
   if (v==='hard'){
     time+=2
   }else if(v==='medium'){
     time += 3
   }else{
     time+=5
   }
   updateTime(); 
 }
})
//settingselect

settingsForm.addEventListener ('change', e => {
  v=e.target.value;
  console.log(v)
  localStorage.setItem('difficulty', v)

  location.reload()


})

settingsBtn.addEventListener('click', ()=> settings.classList.toggle('hide'));
