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
    if (toggle && wasDarkmode) {
        toggle.setAttribute('checked', true);
    }
 }


onload()


