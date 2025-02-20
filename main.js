const slider = document.getElementById('slider');
const output = document.getElementById('sliderValue');
const generateButton = document.querySelector('.button');
const passwordField = document.querySelector('.pw-text');

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
 
  let selectedTypes = [];
  let allChar = '';
  let password = '' 
  let firstCharacters;

function generatePassword(passLength){
  checkInputs()
  
  selectedTypes.forEach((type) => {
    console.log(type)
    // firstCharacters += type.charAt(Math.floor(Math.random() * type.length))
    // password = firstCharacters;
  })

/////////////////////////////////////////////////////////////////////////
//////////////////Generate Remaining////////////////////////////////////
////////////////////////////////////////////////////////////////////////

  let types = allChar;
  for (let i = 0; i < passLength; i++){
    password += types.charAt(Math.floor(Math.random() * types.length));
    
  }
  password = shuffleString(password)
  console.log(`This password is ${password.length} characters long`)
   console.log(password)
   passwordField.textContent = password;
  return password;
}

function checkInputs(){
  allChar = '';
  password = '';
  firstCharacters = '';
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
  console.log(`allChar contains ➡ ${allChar}`)
  
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
 
})


/*


*/
