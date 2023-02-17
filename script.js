

async function getWeatherData(latitudes, longitudes) {
    const weatherData = [];
  
    for (let i = 0; i < latitudes.length; i++) {
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitudes[i]}&longitude=${longitudes[i]}&hourly=temperature_2m,relativehumidity_2m,rain,snowfall,visibility,windspeed_10m`;
      const res = await fetch(apiUrl);
      const data = await res.json();
  
      weatherData.push(data);
    }
  
    return weatherData;
  }
  
  const latitudes = [];
  const longitudes = [];
  
  getWeatherData(latitudes, longitudes).then((weatherData) => {
    console.log(weatherData);
    showCurrentTemp()
  });

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

//Set current Time, date, month 
let currentDay= document.getElementById("day");
let currentTime= document.getElementById("time");

let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

//Get day, month and date
let today = new Date();
let day = today.getDay();
let month = today.getMonth();
let date = today.getDate();

let monthIs = months[month];
let todayIs= weekDays[day];
currentDay.innerHTML=todayIs+', '+ date+' '+monthIs;


//Get exact time
setInterval(() => {

    let dayTime = new Date();
    let hours = dayTime.getHours();
    let minutes = dayTime.getMinutes();
    let hour, minute;

    if (hours<10){
        hour="0"+hours; 
    }
    else {
        hour=hours;
    }

    if (minutes<10){
        minute= "0"+ minutes;
    }
    else {
        minute=minutes;
    }

    let showTime = hour+":"+minute;

    currentTime.innerHTML=showTime;

//Att få Json tid data
    let data = {
        "time": showTime,
        "dayTime": dayTime
    };

    let jsonData = JSON.stringify(data);

    //console.log(jsonData);

}, 1000); 



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






