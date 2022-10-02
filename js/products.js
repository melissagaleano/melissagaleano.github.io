let lista = [];
const ls = localStorage.getItem('catID')
const cat = ls == 101 ? { id: 101, name: 'Autos' } : ls == 102 ? { id: 102, name: 'Juguetes' } : { id: 103, name: 'Muebles' };
const containerProducts = document.getElementById('container-products');



const fetchAPI = async () => {
    const url = `https://japceibal.github.io/emercado-api/cats_products/${cat.id}.json`
    await fetch(url)
        .then(response => response.json())
        .then(data => {lista = data.products; showCategoriesList(lista)});
    console.log(lista)
}
fetchAPI();

function showCategoriesList(array) {
    let html = '';
    array.map(item => {
        html +=
            ` 
                <div class="list-group-item list-group-item-action" id="${item.id}" onclick="productInfo(event)">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + item.image + `" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                    <h4>`+ item.name + ' - USD ' + item.cost + `</h4> 
                                    <p> `+ item.description + `</p> 
                                </div>
                                <small class="text-muted">` + item.soldCount + ` vendidos</small> 
                            </div>

                        </div>
                    </div>
                </div>
            `
    })

    containerProducts.innerHTML = html;
}

function sortDec() {
    const array = lista;

    array.sort(function(a, b) {
        if (a.cost < b.cost) {
            return -1;
        }
        if (a.cost > b.cost) {
            return 1;
        }
        // a must be equal to b
        return 0;
    })

    showCategoriesList(array)
}

    function sortAsc() {
        const array = lista;

        array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            // a must be equal to b
            return 0;
        })

        showCategoriesList(array)
    }

    function sortRel() {
        const array = lista;

        array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) {
                return -1;
            }
            if (a.soldCount < b.soldCount) {
                return 1;
            }
            // a must be equal to b
            return 0;
        })

        showCategoriesList(array)
    }

    function sortPrice() {
        const filterMin = document.getElementById('filterMin').value;
        const filterMax = document.getElementById('filterMax').value;

        const array = lista.filter( item => item.cost >= filterMin && item.cost <= filterMax );
        showCategoriesList(array)
    }
    
    function Search(){
        let filterProduct = [];
        
      const inputSearch = document.getElementById('siteSearch').value;
      lista.map(product => {
        
          if (product.name.indexOf(inputSearch) >= 0 || product.description.indexOf(inputSearch) >= 0 ){
            filterProduct = [...filterProduct, product]
            showCategoriesList(filterProduct)
    
          }
          
      })
    }
    
   
   function productInfo(elemento){
        const id = elemento.srcElement.offsetParent.id
        localStorage.setItem('idProduct', id);
        window.location = "product-info.html"
    }