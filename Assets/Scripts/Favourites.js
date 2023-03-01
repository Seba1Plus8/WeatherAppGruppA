let date = new Date();
const year = date.getFullYear()
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const currentDate = `${year}-0${month}-${day} Time: ${hour}:00`;





const main = document.querySelector("main");
const ul = document.querySelector(".favoriter");

//----------------Detta sparar favoriserade städer
let favorit;
let favoriter = [];
var storedfavourites = []
JSON.parse(localStorage.getItem('favoriter'))
storedfavourites = JSON.parse(localStorage.getItem('favoriter')) 


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
            body.style.backgroundImage = 'url("Assets/Pictures/Snow_20_fill.png")';
        }
    }

    changeBackground()


//-------------appendar sparade städer
function showFavouriteCity(list) {
    let counter = 1;
    list.forEach(element => {
        const li = document.createElement("li");
        if (element.name != undefined) {
            li.innerHTML = `<a href="#" data-index="${counter}">${element.name}, ${element.country}</a>
            <span class="star-icon marked"></span>`
            ul.append(li);
            counter++;               
        }
    })

    const a = document.querySelectorAll("a");


    a.forEach(link => {
        link.addEventListener('click', function(event) {
            const li = document.createElement("li");
            printResults(list[event.target.dataset.index]);
        })
    })

  


        favorit = document.querySelector(".star-icon");
        favorit.addEventListener('click', function() {
            updateStar(favorit, list[0])
        })

        async function printResults(result) {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&hourly=temperature_2m,relativehumidity_2m,surface_pressure,apparent_temperature,precipitation,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin`);
            const data = await res.json();
            console.log(data);

            let hours = [];
            let pressureArr = [];
            let humidityArr = [];
            let index;
            hours = data.hourly.time;
            temps = data.hourly.temperature_2m;
            windspeed = data.hourly.windspeed_10m;
            precipitations = data.hourly.precipitation;
            pressureArr = data.hourly.surface_pressure;
            humidityArr = data.hourly.relativehumidity_2m;

            pressureSurface = pressureArr.at(index);
            humidityValue = humidityArr.at(index);
            index = hours.indexOf(`${year}-0${month}-${date}T${hour}:00`)
            temp = temps.at(index);
            wind = windspeed.at(index)
            precipitation = precipitations.at(index)

            console.log(index);


            const htmlString = `
                <div class="extra-info-container">
                    <i id="info-close" class="fa-regular fa-circle-xmark"></i>
                    
                <div class="currentTemp"><h1 id="h1-temp">Temperature<br>${Math.round(temp)}°C</h1></div>

                    <div class="extra-weather-info-fav">
                        
                        <h2 id="h2-wind">Wind Speed <br>${Math.round(wind)}m/s</h2>
                        <h2 id="h2-precipitation">Precipitation<br>${Math.round(precipitation)}mm</h2>
                        <h2 id="h2-humidity">Humidity<br>${Math.round(humidityValue)}%</h2>
                        <h2 id="h2-pressure">Pressure<br>${Math.round(pressureSurface)}%</h2>

                    </div>
                </div>
                `;

            const section = document.querySelector(".info-section");
            section.innerHTML = htmlString;

            const backButton = document.querySelector('#info-close');

           
            backButton.addEventListener('click', () => {

          
              const extraInfoContainer = document.querySelector('.extra-info-container');
              extraInfoContainer.style.display = 'none';
            });


            const extraInfoContainer = document.querySelector('.extra-info-container');

           
            extraInfoContainer.style.display = 'block';
        }

        
        
        function updateStar(checkbox, item) {

            if (!checkbox.classList.contains("marked")) {      
                saveFavorit(item);
                checkbox.classList.toggle('marked');
                console.log("lägger till");
            } else {
                checkbox.classList.toggle('marked');
                console.log("ta bort");
                deleteFavorit(item);
            }
        }
    }
//-------------lägger till och ta bort sparade städer i favoriter
    async function saveFavorit(result) {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin`);
        const data = await res.json();
        
        favoriter.push(result);
        favoriter.push(data);
        localStorage.setItem('favoriter', JSON.stringify(favoriter));
        storedfavourites = JSON.parse(localStorage.getItem('favoriter'))
    }

    async function deleteFavorit(result) {
        const indexOfRemove = favoriter.findIndex(({id}) => id === result.id);
        
        favoriter.splice(indexOfRemove, 2);
        localStorage.setItem('favoriter', JSON.stringify(favoriter));
        storedfavourites = JSON.parse(localStorage.getItem('favoriter'))
    } 

    showFavouriteCity(storedfavourites);


