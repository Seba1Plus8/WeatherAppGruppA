//Den delen försöker ge hög platsnoggrannhet
  const options = {
    enableHighAccuracy: true
  };

  //API för current location och API för väder 
    const successCallback = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let printCity = document.getElementById("showCurrentCity");
    let windSpeed = document.getElementById("windSpeed");
    let pressure = document.getElementById("pressure");
    let humidity = document.getElementById("humidity");
    let temperature = document.getElementById("temp-span");

//Den delen hämtar en gratis API som anväds för att hämta latitude och longitude och visa vilken stad/exakt location av användaren
//För att API ska funka och kunna hämta info, användaren måste acceptera location på webläsaren och datorn också!
    let apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        const city = data.city;
        printCity.innerHTML = city;
    })

    //API för väder /Skriva ut väder på current location och current time
    let weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,rain,snowfall,surface_pressure,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin`;
    fetch(weatherApiUrl)
    .then(res=>res.json())
    .then (data =>{
    
        let hours = [];
        let tempArr = [];
        let windSpeedArr = [];
        let pressureArr = [];
        let humidityArr = [];
        let index;

        hours = data.hourly.time;
        tempArr = data.hourly.temperature_2m;
        windSpeedArr = data.hourly.windspeed_10m;
        pressureArr = data.hourly.surface_pressure;
        humidityArr = data.hourly.relativehumidity_2m;

        index = hours.indexOf(`${year}-0${month}-${day}T${hour}:00`)

        wind = windSpeedArr.at(index);
        pressureSurface = pressureArr.at(index);
        humidityValue = humidityArr.at(index);
        temp = tempArr.at(index);
    
        
        temperature.innerHTML=`${Math.round(temp)}`+"°C";
        windSpeed.innerHTML = `Wind speed ${Math.round(wind)}m/s`;
        humidity.innerHTML = `Humidity ${Math.round(humidityValue)}%`;
        pressure.innerHTML = `Pressure ${Math.round(pressureSurface)} hPa`;
  
        showCurrentTemp()
        


//Hämta WMO kod och skapa text beroende på kod

        let WMO = data.daily.weathercode[0];
        console.log(WMO)
        let funnyText = document.querySelector("#information-text")


        let sunnyWeatherCode = [0, 1, 2, 3];
        let snowyWeatherCode = [71, 73, 75];
        let rainyWeatherCode = [61, 63, 65];
        let ThunderWeatherCode = [95, 96, 99];
        
        
        if (sunnyWeatherCode.includes(WMO)) {
            funnyText.innerText = "Perfekt väder för att ta en öl i solen, glöm inte solglasögonen!";
          } else if (snowyWeatherCode.includes(WMO)) {
            funnyText.innerText = "Kallt ute! Räkna med att frysa om inte du har varma kläder!";
          } else if (rainyWeatherCode.includes(WMO)) {
            funnyText.innerText = "Det regnar ute, ta med ett paraply!";
          } else if (ThunderWeatherCode.includes(WMO)) {
            funnyText.innerText = "Håll dig inomhus, åskar!!";
          } else {
            funnyText.innerText = "Vädret är opålitiligt!"
          }

        
    })
 
   
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
 


  

  //Set current Time, date, month 
let currentDay= document.getElementById("day");
let currentTime= document.getElementById("time");

let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

//Get day, month and date
let today = new Date();
let year = today.getFullYear()
let day = today.getDay();
let month = today.getMonth();
let date = today.getDate();
let hour = today.getHours()

let timeString = `${year}-0${month}-${date}T${hour}:00`;




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


/* -------- Temperature converter --------- */ 

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

     
     function toggleStar(star) {
         star.classList.toggle('marked');
     }
     
     

 