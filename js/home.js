document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

let storage = localStorage.getItem('email');

const emailStorage = document.getElementById('email');

emailStorage.innerHTML = storage;


// USER MENU

let menu = false; 
const menuUser =  document.getElementById('menuUser');

function userMenu(){
    menu = !menu;
    if (menu){
        menuUser.style.display = 'none';
    }else {
        menuUser.style.display = 'flex';
    }
 }

function logout(){
    localStorage.removeItem('email');
 }
