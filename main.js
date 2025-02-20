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
  let firstCharacters = [];

function generatePassword(passLength){
  checkInputs()
  
  for (let i = 0; i < selectedTypes.length; i++){
   console.log(selectedTypes[i]);
   
   if(selectedTypes[i] === 'lower'){
    let lowerCharacter = lowCase.charAt(Math.floor(Math.random() * lowCase.length));
    firstCharacters.push(lowerCharacter);
    console.log(firstCharacters)

   }

   if(selectedTypes[i] === 'upper'){
    let upperCharacter = upCase.charAt(Math.floor(Math.random() * upCase.length));
    firstCharacters.push(upperCharacter);
    console.log(firstCharacters)

   }

   if(selectedTypes[i] === 'number'){
    let numberCharacter = numbers.charAt(Math.floor(Math.random() * numbers.length));
    firstCharacters.push(numberCharacter);
    console.log(firstCharacters)

   }

   if(selectedTypes[i] === 'symbol'){
    let symbolCharacter = symbols.charAt(Math.floor(Math.random() * symbols.length));
    firstCharacters.push(symbolCharacter);
    console.log(firstCharacters)

   }
   
   password = firstCharacters.join('');

  }


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
 
})


/*


*/
