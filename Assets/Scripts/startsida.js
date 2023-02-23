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
     

 