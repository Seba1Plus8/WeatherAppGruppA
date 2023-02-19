let date = new Date();
const year = date.getFullYear()
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours()
const currentDate = `${year}-0${month}-${day}T${hour}:00`;


const main = document.querySelector("main");
const ul = document.querySelector(".favoriter");

//----------------Detta sparar favoriserade städer
let favorit;
let favoriter = [];
var storedfavourites = []
JSON.parse(localStorage.getItem('favoriter'))
storedfavourites = JSON.parse(localStorage.getItem('favoriter')) 


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
            console.log(event.target.dataset.index)
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
            
            let hours = [];
            let index;
            hours = data.hourly.time;
            temps = data.hourly.temperature_2m;
            index = hours.indexOf(`${year}-0${month}-${day}T${hour}:00`)
            temp = temps.at(index);
            Math.round(temp);
            
            const h1 = document.createElement("h1");
            h1.innerText = `${Math.round(temp)}` 
            main.append(h1)
        }
        
        function updateStar(checkbox, item) {

            if (favorit.classList.contains("marked")) {      
                saveFavorit(item);
                favorit.classList.toggle('marked');
                console.log("lägger till");
            } else {
                favorit.classList.toggle('marked');
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