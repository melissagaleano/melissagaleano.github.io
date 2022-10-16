const url = 'https://raw.githubusercontent.com/JaPCeibal/emercado-api/main/user_cart/25801.json'
let product = JSON.parse(localStorage.getItem('cart')) || []

async function fetchApi() {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}
fetchApi().then(json => {
    
    const { name, count, unitCost, image, id } = json.articles[0];

    const check = product.length === 0 ? undefined : product

    if(check == undefined){
        localStorage.setItem('cart', JSON.stringify([{name, count, unitCost, image, id}]))
        product = [{name, count, unitCost, image, id}];
    }
    
    product.map(article => {
        addElement(article.name, article.count, article.unitCost, article.image, article.id)
    })

});

function addElement(name, count, unitCost, image, id){
    const newElemente = `
    
        <div class="width">
            <p><img src="${image}" alt="${name}"></p>
            <p>${name}</p>
            <p>${unitCost}</p>
            <p><input class="cart-input" type="number" placeholder="1" value="${count}" id="${id}" oninput="changeElementCost(event)"></p>
            <p id="value-${id}">${unitCost*count}</p>
        </div>
    
    `
    document.getElementById("element").innerHTML += newElemente;
}

function changeElementCost(e) {
    const itemId = e.path[0].id
    const element = document.getElementById(`value-${itemId}`);
    const cartProduct = product.filter(item => item.id == itemId)[0]
    const count = e.data || e.target.value;
    const price = cartProduct.unitCost;
    element.textContent = (count * price);
    cartProduct.count = count;

    const cartElements = product.filter(item => item.id != itemId);
    let newCart = [...cartElements, cartProduct];
    localStorage.setItem('cart', JSON.stringify(newCart))
}

