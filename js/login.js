
const button = document.querySelector('.btn-login');
const email = document.querySelector('.email');
const pass = document.querySelector('.pass');
const invalid = document.querySelectorAll('.invalid-feedback');

button.addEventListener('click',(e) =>{
    e.preventDefault();
    
    if([email.value, pass.value].includes("") ){
        email.classList.add('form-control')
        pass.classList.add('form-control')

        for (let i =0; i < 3; i++){
            invalid[i].style.display = 'block';
        }
        return;
    }
    window.location.href = "https://melissagaleano.github.io/home.html";
});

email.addEventListener('keydown', () => {
    if(email.value !== '') {
        email.classList.remove('form-control')
        for (let i =0; i < 3; i++){
            invalid[0].style.display = 'none';
        }
    } else if(email.value == '') {
        email.classList.add('form-control')
        for (let i =0; i < 3; i++){
            invalid[0].style.display = 'block';
    }}
})


pass.addEventListener('keydown', () => {
    if(pass.value !== '') {
        pass.classList.remove('form-control')
        for (let i =0; i < 3; i++){
            invalid[1].style.display = 'none';
        }
    } else if(pass.value == ''){
        pass.classList.add('form-control')
        for (let i =0; i < 3; i++){
            invalid[1].style.display = 'block';
        }
    }
})