/* -------- precheck radio buttons for temperature --------- */ 

const tempUnit = localStorage.getItem("tempUnit");
const celciusInp = document.querySelector('input[value="celsius"]')
const fahrenheitInp = document.querySelector('input[value="fahrenheit"]')

if (fahrenheitInp && tempUnit === "fahrenheit") {
    fahrenheitInp.checked = true;
} else if (celciusInp && tempUnit === "celsius") {
    celciusInp.checked = true;
}


/* -------- Temperature converter --------- */ 

const tempButtons = document.querySelectorAll('input[name="temp-setting"]');

for(const tempButton of tempButtons){
   tempButton.addEventListener('change', showSelected);
}     

   function showSelected(e) {
       if (this.checked) {
       if (this.value === "fahrenheit") {
           console.log("Fahrenheit selected");
           this.checked = true;
           localStorage.setItem("tempUnit", "fahrenheit")
            convertToC();
       } else if (this.value === "celsius") {
            this.checked = true;
           console.log("Celsius selected");
           localStorage.setItem("tempUnit", "celsius")
            convertToF();
       }
       }
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
    console.log(toggle)
    if (toggle && wasDarkmode) {
        toggle.setAttribute('checked', true);
    }
    console.log(onload)
 }


onload()


//-------------Ändra bakgrund beroende på WMO kod----------------

function changeBackground(){
   let backgroundWMO = localStorage.getItem("background");
   let body = document.querySelector("body")
   if(backgroundWMO == "cloudy"){
       body.style.backgroundImage = 'url("Assets/Pictures/tobias-stonjeck-e_ZxKz3_2Nc-unsplash.jpg")'
   } else if(backgroundWMO == "sunny") {
       body.style.backgroundImage = 'url("Assets/Pictures/chuttersnap-TSgwbumanuE-unsplash.jpg")';
   } else if (backgroundWMO == "rainy"){
       body.style.backgroundImage = 'url("Assets/Pictures/frame-harirak-5Q5jtb1SEVo-unsplash.jpg")';
   } else if (backgroundWMO == "thunder"){
       body.style.backgroundImage = 'url("Assets/Pictures/Rainy-day-picture.jpg")';
   } else if (backgroundWMO == "snowy"){
       body.style.backgroundImage = 'url("Assets/Pictures/gabriel-alenius-USXfF_ONUGo-unsplash.jpg")';
   }
}

changeBackground()