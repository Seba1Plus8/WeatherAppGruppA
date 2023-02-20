
 /* -------- Temperature converter --------- */ 

 const tempButtons = document.querySelectorAll('input[name="temp-setting"]');

 for(const tempButton of tempButtons){
    tempButton.addEventListener('change', showSelected);
}     

    function showSelected(e) {
        if (this.checked) {
        if (this.value === "fahrenheit") {
            console.log("Fahrenheit selected");
            localStorage.setItem("tempUnit", "fahrenheit")
             convertToC();
        } else if (this.value === "celsius") {
            console.log("Celsius selected");
            localStorage.setItem("tempUnit", "celsius")
             convertToF();
        }
        }
    }

    function showCurrentTemp() {
        const tempUnit = localStorage.getItem("tempUnit")
        if (tempUnit === 'fahrenheit') {
            convertToF();
     }
    }
    function convertToC() {
        const temperatureSpan = document.getElementById("temp-span");
        const fahrenheit = parseFloat(temperatureSpan.textContent);
        const celsius = (fahrenheit - 32) * 5/9;
        temperatureSpan.textContent = celsius.toFixed(2) + "°C";
      }
      
      function convertToF() {
        const temperatureSpan = document.getElementById("temp-span");
        const celsius = parseFloat(temperatureSpan.textContent);
        const fahrenheit = (celsius * 9/5) + 32;
        temperatureSpan.textContent = fahrenheit.toFixed(2) + "°F";
      }


/* ------ DARKMODE ------ */
function darkmode() {
    const wasDarkmode = localStorage.getItem('darkmode') === 'true';
    localStorage.setItem('darkmode', !wasDarkmode);
    const element = document.body;
    element.classList.toggle('dark-mode', !wasDarkmode);
 }
 
 
 function onload() {
    const wasDarkmode = localStorage.getItem('darkmode') === 'true';
    document.body.classList.toggle('dark-mode', wasDarkmode);
    const toggle = document.getElementById ('darkmode-toggle')
    if (toggle && wasDarkmode) {
        toggle.setAttribute('checked', true);
    }
 }


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

function toggleStar(star) {
    star.classList.toggle('marked');
}




