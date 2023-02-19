//--------------DOM elements
const input = document.querySelector("#search-input");
const ul = document.querySelector("#search-results");
const box = document.querySelector(".box")
//------------detta är för att hitta temperaturen för staden------------
let date = new Date();
const year = date.getFullYear()
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours()
const currentDate = `${year}-0${month}-${day}T${hour}:00`;
//---------- detta är varaibaler för att spara favorit städer
let favorit;
let favoriter = [];
var storedfavourites = []
//------------detta sparar städerna i en localstorage så att vi kan komma åt den i favourites.html
JSON.parse(localStorage.getItem('favoriter'))
storedfavourites = JSON.parse(localStorage.getItem('favoriter'))


/* ------sparar ifall vi behöver det i framtiden
const form = document.getElementById('search-form');
 const searchResults = document.getElementById('search-results');
 
 form.addEventListener('submit', function(event) {
   event.preventDefault();
   const searchTerm = this.search.value;
   const listItem = document.createElement('li');
   listItem.innerText = searchTerm;
   
   const list = document.createElement('ul');
   list.appendChild(listItem);
   searchResults.appendChild(list);
   
   this.reset();
 });
*/


//-----------------denna funktion körs varje gång man skriver in en bokstav på sökrutan
    async function updateValue() {
        const res = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + input.value);
        var data = await res.json();
        
        //-------------------detta skriver ut resultatet från sök
        if (input.value.length > 0) {
            ul.innerHTML = 
            `
            <li><a href="#">${data.results[0].name}, ${data.results[0].country}</a>
            <label for="test">
            <input type="checkbox" name="test" id="favorit">
            </label>
            </li>
            ` 
        }
        
        favorit = document.querySelector("#favorit");
        const a = document.querySelector("a");
        
        if (favorit != undefined) {
            favorit.addEventListener("change", function() {
                updateStar(favorit, data.results[0]);
                
            })
        }
        
        a.addEventListener('click', function() {
            console.log(data.results[0])
            printResults(data.results[0]);
        })
    }
    
    //-------------här behöver vi koda så att det appendas som det gör på startsidan----------------
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
    //----------------Detta är funktionerna när man lägger till i sparade städer och tar bort från sparade städer
    function updateStar(checkbox, item) {
        console.log(item)
        if (checkbox.checked) {      
            saveFavorit(item);
        } else {
            console.log("ta bort");
            deleteFavorit(item);
        }
    }
    
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
    
    input.addEventListener('input', updateValue)