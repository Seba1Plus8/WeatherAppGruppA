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
 /* -------------------- */ 