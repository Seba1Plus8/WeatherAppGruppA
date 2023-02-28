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
            body.style.backgroundImage = 'url("Assets/Pictures/gabriel-alenius-USXfF_ONUGo-unsplash.jpg")';
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
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FBerlin`);
            const data = await res.json();
            console.log(data);
            
            
            let hours = [];
            let index;
            hours = data.hourly.time;
            temps = data.hourly.temperature_2m;
            windspeed = data.hourly.windspeed_10m;
            precipitations = data.hourly.precipitation;
            index = hours.indexOf(`${year}-0${month}-${day}T${hour}:00`)
            temp = temps.at(index);
            wind = windspeed.at(index)
            precipitation = precipitations.at(index)
            Math.round(wind);
            Math.round(temp);
            Math.round(precipitation);

            
            const h1 = document.createElement("h1");
            h1.innerHTML = `${Math.round(temp)}` 
            ul.append(h1)

            const h2 = document.createElement("h2");
            h2.innerHTML = `${wind + "m/s"}`
            ul.append(h2)

            const h3 = document.createElement("h2");
            h3.innerHTML = `${hour}:00`
            ul.append(h3)

            const h4 = document.createElement("h2");
            h4.innerHTML = `${precipitation}`
            ul.append(h4)
            

            feels = data.hourly.apparent_temperature;
            Math.round(temp);

            for (let i = 0;i < 25; i++) {
                const element = hours[i];
                const li = document.createElement("li");
                li.innerHTML = `
                <div class="upper-Box">
                <h2>${i.toLocaleString("se", {minimumIntegerDigits:2})}:00</h2> 
                <h3>${Math.round(temps[i])}C</h3>
                <h6>${Math.round(windspeed[i])}m/s</h6>
                </div>
                <div class="lower-Box">
                <h6>${precipitations[i]}mm</h6>
               <img src="/550c1520618de7f49b3ca4f8d92fcc4d.png" class="icon" alt="vädret">
                <h6>${Math.round(feels[i])}C</h6>
                </div>
                ` 
                ul.append(li);
            }


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


