/* const url = 'https://raw.githubusercontent.com/JaPCeibal/emercado-api/main/user_cart/25801.json' */
let product = JSON.parse(localStorage.getItem('cart')) || [];

/* Variables que se le asigna valor al cambiar el subtotal y el costo de envío */
let subtotal = 0;
let shippingCost = 0;
let paymentOption = null;
updateElements();

/* async function fetchApi() {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}
fetchApi().then(json => {
    
    const { name, count, unitCost, image, id } = json.articles[0];

    const check = product.length === 0 ? undefined : product

    if(check == undefined){
        console.log(json.articles[0])
        localStorage.setItem('cart', JSON.stringify([{name, count, unitCost, image, id}]))
        product = [{name, count, unitCost, image, id}];
    }
    
    product.map(article => {
        addElement(article.name, article.count, article.unitCost, article.image, article.id);
        subtotal = subtotal + (article.unitCost * article.count);
        updateTotal(subtotal, shippingCost)
    })

}); */

function addElement(name, count, unitCost, image, id){
    const newElemente = `
    
        <div class="width">
            <p><img src="${image}" alt="${name}"></p>
            <p>${name}</p>
            <p>${unitCost}</p>
            <p><input class="cart-input" type="number" placeholder="1" value="${count}" id="${id}" oninput="changeElementCost(event)"></p>
            <p id="value-${id}">${unitCost*count}</p>
            <div class="border border-2 rounded-1 border-danger px-1 pt-1 pointer" id="delete-${id}" onclick="handleDeleteProduct(event)"><i class="far fa-trash-can text-danger fs-5"></i></div>
        </div>
    
    `
    document.getElementById("element").innerHTML += newElemente;
}

function changeElementCost(e) {
    const itemId = e.path[0].id
    const element = document.getElementById(`value-${itemId}`);
    const cartProduct = product.filter(item => item.id == itemId)[0]
    const count = Number(e.path[0].value);
    const price = cartProduct.unitCost;
    element.textContent = (count * price);
    cartProduct.count = count;
    
    /* Actualizo el subtotal con el valor de todos los productos del carrito sin contar el que estoy modificando */
    const remainingProducts = product.filter(item => item.id !== Number(e.target.id))
    subtotal = 0;
    remainingProducts.map(item => subtotal += (item.unitCost * item.count))
    /* Obtengo el producto que estoy modificando y actualizo el subtotal con el nuevo valor */
    const updatingProduct = product.filter(item => item.id === Number(e.target.id));
    subtotal = subtotal + (updatingProduct[0].unitCost * count);
    const total = (subtotal * shippingCost) / 100
    updateTotal(subtotal, total)

    const cartElements = product.filter(item => item.id != itemId);
    let newCart = [...cartElements, cartProduct];
    localStorage.setItem('cart', JSON.stringify(newCart))
}

/* Actualiza la tabla de costos del carrito */
function updateTotal(subtotal, shipping) {
    const subtotalElement = document.getElementById('subtotalTable');
    const shippingElement = document.getElementById('shippingCostTable');
    const totalElement = document.getElementById('totalTable');

    subtotalElement.textContent = `USD ${subtotal}`;
    shippingElement.textContent = `USD ${shipping}`;
    const total = subtotal + shipping;
    totalElement.textContent = `USD ${total}`;
}

/* Actualiza el costo de envio cuando se selecciona o cambia el tipo de envío */
function handleShippingCost(e) {
    const type = e.target.value;
    const cost = type === 'premium' ? 15 : type === 'express' ? 7 : 5;
    const total = (subtotal * cost) / 100;
    shippingCost = cost;
    updateTotal(subtotal, total)

    /* Oculta el mensaje de error al validar */
    const shippingError = document.getElementById('shippingError')
    shippingError.style.display = 'none'
}

/* Abre el modal a traves de un onclick event */
function handlePaymentModal() {
    new bootstrap.Modal(document.getElementById('myModal')).show();
}

/* Deshabilita inputs del modal de metodo de pago al seleccionar una opcion */
function handlePaymentMethod(e) {
    const option = e.target.value === 'creditCard' ? 0 : 1
    paymentOption = option;
    const ccNumber = document.getElementById('ccNumber');
    const ccPin = document.getElementById('ccPin');
    const ccDate = document.getElementById('ccDate');
    const btNumber = document.getElementById('btNumber');
    option === 1 ? (
        ccNumber.disabled = true, ccPin.disabled = true, ccDate.disabled = true, btNumber.disabled = false
    ) : (
        btNumber.disabled = true, ccNumber.disabled = false, ccPin.disabled = false, ccDate.disabled = false
    );

    /* Oculta el mensaje de error al validar */
    const paymentError = document.getElementById('paymentError')
    paymentError.style.display = 'none'
}

function handlePay() {
    const dirStreet = document.getElementById('street');
    const dirNumber = document.getElementById('number');
    const dirCorner = document.getElementById('corner');
    const ccNumber = document.getElementById('ccNumber');
    const ccPin = document.getElementById('ccPin');
    const ccDate = document.getElementById('ccDate');
    const btNumber = document.getElementById('btNumber');
    let isProductAmount = false;
    
    /* Valida los campos de la dirección */
    const addressError = document.getElementsByClassName('addressError');
    if([dirStreet.value, dirNumber.value, dirCorner.value].includes('')) {
        dirStreet.classList.add('input-void');
        dirNumber.classList.add('input-void');
        dirCorner.classList.add('input-void');
        for(let i = 0; i < addressError.length; i++) {
            addressError[i].style.display = 'block'
        }
        return
    }
    dirStreet.classList.remove('input-void');
    dirNumber.classList.remove('input-void');
    dirCorner.classList.remove('input-void');
    for(let i = 0; i < addressError.length; i++) {
        addressError[i].style.display = 'none'
    }

    /* Valida forma de envío */
    const shippingError = document.getElementById('shippingError')
    if(shippingCost === 0) {
        shippingError.style.display = 'block'
        return
    }

    /* Valida que no hayan productos sin cantidad */
    product.map(item => item.count <= 0 && (isProductAmount = true))
    if(isProductAmount) {
        console.log('producto cantidad')
        return
    }

    /* Valida que haya forma de pago */
    const paymentError = document.getElementById('paymentError')
    if(paymentOption === null) {
        paymentError.style.display = 'block';
        return
    }

    /* Valida los campos de la forma de pago */
    const paymentVoidError = document.getElementById('paymentVoidError')
    if(paymentOption === 0 && [ccNumber.value, ccPin.value, ccDate.value].includes('')) {
        paymentVoidError.style.display = 'block';
        return
    }
    if(paymentOption === 1 && [btNumber.value].includes('')) {
        paymentVoidError.style.display = 'block';
        return
    }
    paymentVoidError.style.display = 'none'
    
    window.scrollTo(0, 0);
    const buyAlert = document.getElementById('buyAlert');
    buyAlert.textContent = '¡Has comprado con éxito!'
    buyAlert.style.display = 'block'
    setTimeout(() => {
        buyAlert.style.display = 'none'
    }, 10000)
}

function handleDeleteProduct(e) {
    const productId = Number((e.path[1].id).split('-')[1]);
    const updatedProducts = product.filter(item => item.id !== productId);
    updatedProducts ? localStorage.setItem('cart', JSON.stringify(updatedProducts)) : localStorage.setItem('cart', [])
    product = updatedProducts;
    updateElements();
    
    /* Actualizar el subtotal */
    subtotal = 0;
    updatedProducts.map(item => subtotal = subtotal + (item.unitCost * item.count))
    const total = (subtotal * shippingCost) / 100;
    updateTotal(subtotal, total);
}

function updateElements() {
    if(product.length === 0) {
        document.querySelector('#cartVoid').style.display = 'none'
        document.querySelector('#cartVoidText').style.display = 'block'
    }
    document.getElementById("element").innerHTML = '';
    product.map(item => {
        const newElement = `
            <div class="width">
                <p><img src="${item.image}" alt="${item.name}"></p>
                <p>${item.name}</p>
                <p>${item.unitCost}</p>
                <p><input class="cart-input" type="number" placeholder="1" value="${item.count}" id="${item.id}" oninput="changeElementCost(event)"></p>
                <p id="value-${item.id}">${item.unitCost * item.count}</p>
                <div class="border border-2 rounded-1 border-danger px-1 pt-1 pointer" id="delete-${item.id}" onclick="handleDeleteProduct(event)"><i class="far fa-trash-can text-danger fs-5"></i></div>
            </div>
        `
        document.getElementById("element").innerHTML += newElement;
        subtotal = subtotal + (item.unitCost * item.count);
        updateTotal(subtotal, shippingCost)
    })
}