const button = document.querySelector('.btn-login');
const email = document.querySelector('.email');
const pass = document.querySelector('.pass');
const invalid = document.getElementsByClassName('invalid-feedback');

button.addEventListener('click',(e) =>{
    e.preventDefault();  //previene que el formulario se envie por defecto 
    
    if([email.value, pass.value].includes("") ){  
        email.classList.add('form-control')
        pass.classList.add('form-control')

        for (let i =0; i < invalid.length; i++){ //for para recorrer todos los elementos de invalid y mostrarlos cuando hay un input ""
            invalid[i].style.display = 'block';
        }
        return;
    }

    let storage = localStorage.setItem('email',email.value);

    window.location.href = "https://melissagaleano.github.io/home.html"; //redirecciona si la condicion no se cumple
    // window.location.href = "http://127.0.0.1:5501/home.html";
});

email.addEventListener('keydown', () => {
    let style = 'none'
    email.value !== '' ? email.classList.remove('form-control') : style = 'block'; // si el input es distinto a "" se le remueve la clase
    invalid[0].style.display = style;                                              // si tiene contenido al input se le aplica un display block
})

pass.addEventListener('keydown', () => {
    let style = 'none'
    pass.value !== '' ? pass.classList.remove('form-control') : style = 'block'; // si el input es distinto a "" se le remueve la clase
    invalid[1].style.display = style;                                            // si tiene contenido al input se le aplica un display block
}) 

function handleCredentialResponse() {
    window.location.href = 'https://melissagaleano.github.io/home.html'
}

localStorage.setItem('email',email.value);

console.log(localStorage.getItem('email'));
