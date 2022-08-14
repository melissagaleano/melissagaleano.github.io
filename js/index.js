const button = document.querySelector('.btn-login');
const email = document.querySelector('.email');
const pass = document.querySelector('.pass');
const invalid = document.getElementsByClassName('invalid-feedback');

button.addEventListener('click',(e) =>{
    e.preventDefault();  //previene que el formulario se envie por defecto 
    
    if([email.value, pass.value].includes("") ){  
        email.classList.add('form-control')
        pass.classList.add('form-control')

        for (let i =0; i < invalid.length; i++){
            invalid[i].style.display = 'block';
        }
        /* invalid.map( item => (
            item.style.display = "block"
        )) */

        return;
    }
    window.location.href = "https://melissagaleano.github.io/home.html";
});

email.addEventListener('keydown', () => {
    let style = 'none'
    email.value !== '' ? email.classList.remove('form-control') : style = 'block';
    invalid[0].style.display = style;
})

pass.addEventListener('keydown', () => {
    let style = 'none'
    pass.value !== '' ? pass.classList.remove('form-control') : style = 'block';
    invalid[1].style.display = style;
}) 

function handleCredentialResponse() {
    window.location.href = 'https://melissagaleano.github.io/home.html'
}