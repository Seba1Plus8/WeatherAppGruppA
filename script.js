/* ------ DARKMODE ------ */

function darkmode() {
    const wasDarkmode = localStorage.getItem('darkmode') === 'true';
    localStorage.setItem('darkmode', !wasDarkmode);
    const element = document.body;
    element.classList.toggle('dark-mode', !wasDarkmode);
 }
 
 
//  function onload() {
    const wasDarkmode = localStorage.getItem('darkmode') === 'true';
    document.body.classList.toggle('dark-mode', wasDarkmode);
    const toggle = document.getElementById ('darkmode-toggle')
    if (toggle && wasDarkmode) {
        toggle.setAttribute('checked', true);
    }
//  }

 /* --------If sats for funny text --------- */ 

let temp = document.querySelector(".temperature")
let funnyText = document.querySelector("#information-text")

let tempNum = parseInt(temp.innerHTML)


if (tempNum>=20){
    funnyText.innerText = "Perfekt väder för att ta en öl i solen, glöm inte solglasögonen!"
} else if (tempNum<0) {
    funnyText.innerText = "Kallt ute! Räkna med att frysa om inte du har varma kläder!"
} else if (tempNum<20 || tempNum>0){
    funnyText.innerText = "Nu är vädret lagom!"
} else {
    funnyText.innerText = "Vädret är oförutsägbart!"
}

console.log(tempNum)


