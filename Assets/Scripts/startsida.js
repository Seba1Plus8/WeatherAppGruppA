<<<<<<< HEAD
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
=======
//Den delen försöker ge hög platsnoggrannhet
  const options = {
    enableHighAccuracy: true
  };

  //API för current location och API för väder 
    const successCallback = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
>>>>>>> main

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
    let weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,rain,snowfall,surface_pressure,visibility,windspeed_10m`;
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

<<<<<<< HEAD
 //Get day, month and date
 let today = new Date();
 let day = today.getDay();
 let month = today.getMonth();
 let date = today.getDate();
=======
//Get day, month and date
let today = new Date();
let year = today.getFullYear()
let day = today.getDay();
let month = today.getMonth();
let date = today.getDate();
let hour = today.getHours()

let timeString = `${year}-0${month}-${date}T${hour}:00`;



>>>>>>> main

 let monthIs = months[month];
 let todayIs= weekDays[day];
// currentDay.innerHTML=todayIs+', '+ date+' '+monthIs;



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

 /* -------- Temperature converter --------- */ 

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
     
async function printResults(result) {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin`);
    const data = await res.json();
  
    console.log(data);
  
    // get the index of the current hour in the hourly data array
    const currentHourIndex = data.hourly.time.indexOf(currentDate);
  
    // if the current hour is not found in the hourly data, exit the function
    if (currentHourIndex === -1) {
      console.log("Hourly data for the current hour not found.");
      return;
    }
  
    // get the temperature and windspeed data for the current hour
    const temp = Math.round(data.hourly.temperature_2m[currentHourIndex]);
    const windspeed = Math.round(data.hourly.windspeed_10m[currentHourIndex]);
  
    // print the temperature and windspeed for the current hour
    const h1 = document.createElement("h1");
    h1.innerText = `${temp}°C, ${windspeed} m/s`;
    main.append(h1);
  
    // print the hourly information
    const hourlyList = document.createElement("ul");
    for (let i = currentHourIndex; i < data.hourly.time.length; i++) {
      const hourData = data.hourly;
      const hour = hourData.time[i].slice(11, 13);
      const temp = Math.round(hourData.temperature_2m[i]);
      const precipitation = hourData.precipitation[i];
      const windspeed = Math.round(hourData.windspeed_10m[i]);
      const li = document.createElement("li");
      li.innerHTML = `<strong>${hour}:00</strong> ${temp}°C, ${windspeed} m/s`;
      hourlyList.append(li);
    }
    main.append(hourlyList);
  }
     

 