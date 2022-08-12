let list = [];
const containerProducts = document.querySelector('.container-products')
let htmlContentToAppend = "";

const fetchApi = async () =>{
    const product = "https://japceibal.github.io/emercado-api/cats_products/101.json";
    await fetch(product)
        .then(response => response.json())
        .then(data => list = data.products);
    showCategoriesList();
}
fetchApi();


const showCategoriesList = () =>{
    console.log(list);
    
    list.map(product => (
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image+ `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h4>`+ product.name + ' - USD ' + product.cost + `</h4> 
                            <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        
    ))
    console.log(htmlContentToAppend);
    
    containerProducts.innerHTML = htmlContentToAppend; 
}

