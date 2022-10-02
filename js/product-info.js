let lista = [];
let comments = [];
const containerProducts = document.getElementById('container');
const containerComments =  document.getElementById('container-comments');
let idProduct = localStorage.getItem('idProduct');
const ls = localStorage.getItem('catID')
const cat = ls == 101 ? { id: 101, name: 'Autos' } : ls == 102 ? { id: 102, name: 'Juguetes' } : { id: 103, name: 'Muebles' };

const fetchAPI = async () => {
    const url = `https://japceibal.github.io/emercado-api/cats_products/${cat.id}.json`
    const url2 = `https://japceibal.github.io/emercado-api/products_comments/${idProduct}.json`
    Promise.all([
        fetch(url)
        .then(response => response.json())
        .then(data => {lista = data.products; showCategoriesList(lista); {
            const container = document.getElementById('otherProducts');
            let html = '';
            const actual = lista.filter(item => item.id != Number(idProduct));
            for(let i = 0; i < actual.length; i++) {
                html += `
                    <div class="product ${actual[i].id}" onclick="redirectProduct(event)">
                        <img src="${actual[i].image}" />
                        <div>${actual[i].name}</div>
                    </div>
                `
            }
            container.innerHTML = html
        }})
    ], [fetch(url2)
        .then(response => response.json())
        .then(data => {comments = data; showCategoriesComment(comments)})
    ])
}
fetchAPI();

function showCategoriesList(array) {
    let html = '';
    
    let item = array.filter(item => item.id == idProduct);

        html =
            `<div style="padding:0 400px">
                <h2 class="mt-4 ">${item[0]?.name}</h2><br><hr>
                
                
                <div class="font-weight-bold" >Precio</div>
                <p>${item[0]?.cost}</p>
                
                <div class="font-weight-bold">Descripcion</div>
                <p>${item[0]?.description}</p>
                
                <div class="font-weight-bold">Categoria</div>
                <p>${item[0]?.name}</p>

                <div class="font-weight-bold">Cantidad de Vendidos</div>
                <p>${item[0]?.soldCount}</p>

                <div class="font-weight-bold">Imagen Ilustrativa</div>
                <img src="${item[0]?.image}" alt="Imagen del producto">
            </div>
            `
    containerProducts.innerHTML = html;
}

function showCategoriesComment(array) {
    containerComments.innerHTML = ''
    array.map(item => {
        const container = document.createElement('div')
        const infoDes = document.createElement('p')
        const infoUser = document.createElement('p')
 
        container.className ='border border-2'
        infoUser.id = 'star';

        infoUser.textContent = `${item.user} - ${item.dateTime}`
        infoDes.textContent = `${item.description}`

        for(var i = 0; i < 5 ; i++){
            const star = document.createElement('span')
            star.className = `fa fa-star ${item.score > i ? 'checked' : null}`
            infoUser.appendChild(star)
        }
        
        
        container.appendChild(infoUser)
        container.appendChild(infoDes)
        containerComments.appendChild(container)  
    })
}

const area =  document.getElementById('area');
const select =  document.getElementById('select');

function createCom(){
    const user = localStorage.getItem('email').split('@')[0]
    const description = area.value
    const score = select.value
    let dateTime = new Date(Date.now()).toISOString();
    dateTime = dateTime.split('T')[0] + " " + dateTime.split('T')[1].split('.')[0]
    const product = localStorage.getItem('idProduct')
    const newComment = {user, description, score, dateTime, product}
    comments.push(newComment)
    
    showCategoriesComment(comments)
}

function redirectProduct(element) {
    const idProduct = element.path[1].classList[1];
    localStorage.setItem('idProduct', idProduct)
    window.location.href = "product-info.html";
}