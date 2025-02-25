const slider = document.getElementById('slider');
const output = document.getElementById('sliderValue');
const generateButton = document.querySelector('.button');
const passwordField = document.querySelector('.pw-text');

const bar1 = document.getElementById('box-1');
const bar2 = document.getElementById('box-2');
const bar3 = document.getElementById('box-3');
const bar4 = document.getElementById('box-4');

// FF not respecting default value
document.addEventListener("DOMContentLoaded", ()=> {
  slider.value = 0;
  for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
  }
})

slider.addEventListener('input', () => {
  output.textContent = slider.value;
})

for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    
  }

  /******************* Password Generation *******************
  *************************************************************/

  const lowCase = "abcdefghijklmnopqrstuvxyz";
  const upCase = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
  const numbers = "0123456789";
  const symbols = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;

  //Array(4) [ "Z", "q", "5", "\\" ]
 
  let selectedTypes = [];
  let allChar = '';
  let password = '' 
  let firstCharacters = [];

function generatePassword(passLength){
  if (passLength < 4){
    passwordField.textContent = `Too short`
    return}
  checkInputs()
  addInitialCharacters()
  

  /////////////////////////////////////////////////////////////////////////
//////////////////Generate Remaining////////////////////////////////////
////////////////////////////////////////////////////////////////////////

  let types = allChar;
  for (let i = 0; i < passLength - 4; i++){
    password += types.charAt(Math.floor(Math.random() * types.length));
    
  }
  password = shuffleString(password)
  console.log(`This password is ${password.length} characters long`)
  //  console.log(password)
   passwordField.textContent = password;
  return password;
}

function checkInputs(){
  allChar = '';
  password = '';
  selectedTypes = [];
  
  const checked = document.querySelectorAll('input:checked');
  checked.forEach((checkbox) => {
  
  if (checkbox.id === 'upper'){
    allChar += upCase;
    selectedTypes.push('upper')
    
  }

  if (checkbox.id === 'lower'){
    // console.log('Lower confirmed 👍')
    allChar += lowCase;
    selectedTypes.push('lower')
  }

  if (checkbox.id === 'number'){
    // console.log('number confirmed 👍')
    allChar += numbers;
    selectedTypes.push('number')
  }

  if (checkbox.id === 'symbol'){
    // console.log('symbol confirmed 👍')
    allChar += symbols;
    selectedTypes.push('symbol')
  }
  
     
  })
  // console.log(`allChar contains ➡ ${allChar}`)
  
}

function addInitialCharacters() {
  for (let i = 0; i < selectedTypes.length; i++){
    console.log(selectedTypes[i]);
    
    if(selectedTypes[i] === 'lower'){
     let lowerCharacter = lowCase.charAt(Math.floor(Math.random() * lowCase.length));
     firstCharacters.push(lowerCharacter);
     
 
    }
 
    if(selectedTypes[i] === 'upper'){
     let upperCharacter = upCase.charAt(Math.floor(Math.random() * upCase.length));
     firstCharacters.push(upperCharacter);
     
 
    }
 
    if(selectedTypes[i] === 'number'){
     let numberCharacter = numbers.charAt(Math.floor(Math.random() * numbers.length));
     firstCharacters.push(numberCharacter);
     
 
    }
 
    if(selectedTypes[i] === 'symbol'){
     let symbolCharacter = symbols.charAt(Math.floor(Math.random() * symbols.length));
     firstCharacters.push(symbolCharacter);
     
    }
 
    console.log(firstCharacters);
    password = firstCharacters.join('');
 
 
 
   }
}

/*
 regMedium = at least one number, symbol, uppercase and lowercase letter between 9-12 characters
 regWeak = at least 6-8 characters using only 2 types
 regTooWeak = 1-5 characters only (type doesnt matter)
*/

function checkStrength() {
  const allBars = document.querySelectorAll('.strength-box__bar');
  
  const regStrong = /^(?=.*[abcdefghijklmnopqrstuvxyz])(?=.*[ABCDEFGHIJKLMNOPQRSTUVXYZ])(?=.*[0123456789])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]).{13,20}$/;
  const regMedium = /^(?=.*[abcdefghijklmnopqrstuvxyz])(?=.*[ABCDEFGHIJKLMNOPQRSTUVXYZ])(?=.*[0123456789])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]).{9,12}$/;
  const regWeak = /^(?=(?:.*[abcdefghijklmnopqrstuvxyz])?(?:.*[ABCDEFGHIJKLMNOPQRSTUVXYZ])?(?:.*[0123456789])?(?:.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])?){2}.*.{6,8}$/;
  const regTooWeak = /^.{1,5}$/;

  if (regStrong.test(password)){
    console.log('password is strong ✅')
    
    allBars.forEach((bar) => {
      bar.classList.add('strong');
    })
  
  } else if(regMedium.test(password)) {
    console.log('password is medium 🟡')

  } else if(regWeak.test(password)) {
    console.log('password is weak 🟠')

  } else if(regTooWeak.test(password)) {
    console.log('password is too weak 🔴')
  }

}


// SHUFFLE
function shuffleString(str) {
  const chars = str.split('');
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

generateButton.addEventListener('click', () => {
  generatePassword(slider.value)
  firstCharacters = [];
  checkStrength()
})


/*


*/
