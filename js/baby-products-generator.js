let jsonObject = {} 
let productsContainer = document.getElementById('products');

requestJSON = () => {
    let req = new XMLHttpRequest();
    req.open('GET', 'https://raw.githubusercontent.com/YasudaYutaka/Desafio-Loja-Ecommerce/main/js/products.json', false); 
    req.send(null);
    if(req.status == 200) {
      jsonObject = JSON.parse(req.responseText);
    }
}

generateProducts = () => {
    requestJSON();
    for(let x = 0; x < jsonObject.products.length; x++) {
        if(jsonObject.products[x].type =='baby') {
            productsContainer.innerHTML += `
        
            <div class="single-product">
                <img src="`+jsonObject.products[x].img+`">
                <span class="catalog-line"></span>
                <p class="product-title">`+jsonObject.products[x].name+`</p>
                <p class="product-price">R$`+jsonObject.products[x].price+`,00</p>
                <a class="product-button" key="`+jsonObject.products[x].id+`" href="#">Comprar</a>
            </div>
    
            `;
        }
    }
}

generateProducts();
generateProducts();



/****** FILTRO *******/

// Fitro preço
filterByPrice = (json, value) => {
    let exists = false;
    productsContainer.innerHTML = ``;
    for(let x = 0; x < json.length; x++) {
        if(json[x].type == 'baby' && json[x].price == value) {
            exists = true;
            productsContainer.innerHTML += `
            <div class="single-product">
                <img src="`+json[x].img+`">
                <span class="catalog-line"></span>
                <p class="product-title">`+json[x].name+`</p>
                <p class="product-price">R$`+json[x].price+`,00</p>
                <a class="product-button" key="`+json[x].id+`" href="#">Comprar</a>
            </div>
            `;
        }
    }
    if(!exists) {
        productsContainer.innerHTML = `'
        <h2>Nenhum produto foi encontrado :(</h2>
        `;
    }
}

//console.log(filterByPrice(jsonObject.products, 190));

// Filtro menor valor

filterByLowestPrice = (json) => {
    for(let x = 0; x < json.length; x++) {

    }
}

console.log(filterByLowestPrice(jsonObject.products));


// Filtro maior valor

filterByBiggestPrice = () => {

}

// Filtro por COR



/******************************************************************************** FILTRO ******************************************************************************/












//////////////////////////////////////////////// Filtro menor valor ////////////////////////////////////////////////

let priceOrderedJson;
filterByLowestPrice = (json) => {

    productsContainer.innerHTML = ``;

    priceOrderedJson = Object.values(json).sort(function(a,b) {
        return a.price < b.price ? -1 : (a.price > b.price ? 1 : 0);
    });

    for(let x = 0; x < priceOrderedJson.length; x++) {
        if(priceOrderedJson[x].type == 'baby') {
            productsContainer.innerHTML += `

            <div class="single-product">
                <img src="`+priceOrderedJson[x].img+`">
                <span class="catalog-line"></span>
                <p class="product-title">`+priceOrderedJson[x].name+`</p>
                <p class="product-price">R$`+priceOrderedJson[x].price+`,00</p>
                <a class="product-button" key="`+priceOrderedJson[x].id+`" href="#">Comprar</a>
            </div>

            `;
        }
    }

}


//////////////////////////////////////////////// Filtro maior valor ////////////////////////////////////////////////

filterByBiggestPrice = (json) => {

    productsContainer.innerHTML = ``;

    priceOrderedJson = Object.values(json).sort(function(a,b) {
        return a.price < b.price ? 1 : (a.price > b.price ? -1 : 0);
    });

    for(let x = 0; x < priceOrderedJson.length; x++) {
        if(priceOrderedJson[x].type == 'baby') {
            productsContainer.innerHTML += `

            <div class="single-product">
                <img src="`+priceOrderedJson[x].img+`">
                <span class="catalog-line"></span>
                <p class="product-title">`+priceOrderedJson[x].name+`</p>
                <p class="product-price">R$`+priceOrderedJson[x].price+`,00</p>
                <a class="product-button" key="`+priceOrderedJson[x].id+`" href="#">Comprar</a>
            </div>
            `;

        }
    }

}


//////////////////////////////////////////////// Filtro por COR ////////////////////////////////////////////////

filterByColor = (json, color) => {
    productsContainer.innerHTML = ``;
    for(let x = 0; x < json.length; x++) {
        for(let z = 0; z < json[x].color.length; z++) {
            if(json[x].type == "baby" && json[x].color[z] == color) {
                console.log(json[x]);//////////////////////////////////
                productsContainer.innerHTML += `
                
                <div class="single-product">
                <img src="`+json[x].img+`">
                <span class="catalog-line"></span>
                <p class="product-title">`+json[x].name+`</p>
                <p class="product-price">R$`+json[x].price+`,00</p>
                <a class="product-button" key="`+json[x].id+`" href="#">Comprar</a>
                </div>
                
                `;
            }
        }
    }
}




