const slider = document.getElementById('slider');
const output = document.getElementById('sliderValue');
const generateButton = document.querySelector('.button');
const passwordField = document.querySelector('.pw-text');


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
  const specialChar = "£$&()*+[]@#^-_!?";
  const allChar = '';

function generatePassword(passLength){
  checkInputs()
  
  let password = 'Ef-4' // add guaranteed upper and lowerecase number manually
  let allType = lowCase.concat(upCase, numbers, specialChar);
  
  for (let i = 0; i < passLength - 4; i++){
    password += allType.charAt(Math.floor(Math.random() * allType.length));
    
  }
  password = shuffleString(password)
  console.log(`This password is ${password.length} characters long`)
   console.log(password)
   passwordField.textContent = password;
  return password;
}

function checkInputs(){
  const checked = document.querySelectorAll('input:checked');
  
  checked.forEach((checkbox) => {
    console.log(`${checkbox.id} is checked ✅`)
    // If checkbox contains number - push numbers into all characters string
    if(checkbox.id === 'upper'){
      console.log(`${checkbox.id} is upper`)
    } else {
      console.log(`${checkbox.id}is ${checkbox.id}`)
    }
  })
  return;
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
