

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



