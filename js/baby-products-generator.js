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




/******************************************************************************** FILTRO ******************************************************************************/

let json = jsonObject.products; 

// Seleciona a funcao de acordo com a opcao selecionada

selectedFilter = () => {

    var selectedOption = document.getElementsByClassName('form-select')[0].value;

    if(selectedOption == 'price-ascending') {
        filterByLowestPrice(json);
    } else if(selectedOption == 'price-descending') {
        filterByBiggestPrice(json);
    } 

}



// Filtro preco minimo e maximo 

filterByPrice = () => {

    if(document.getElementById('min-value').value == "" || document.getElementById('max-value').value == "") { // verifica se esta vazio
        alert('Digite um valor');
    } else {

        let min = Number.parseInt(document.getElementById('min-value').value);
        let max = Number.parseInt(document.getElementById('max-value').value);
        let exists = false;

        if(min > max) {
            alert('Digite um valor mínimo menor do que o valor máximo');
        } else {

            productsContainer.innerHTML = ``;

            for(let x = 0; x < json.length; x++) {  // percorre o json

                if(json[x].type == 'baby' && json[x].price >= min && json[x].price <= max) {

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

            if(!exists) { // caso produto nao exista

                productsContainer.innerHTML = `'
                    <h2>Nenhum produto foi encontrado :(</h2>
                `;

            }

        }

    }
}



// Filtro menor valor 

filterByLowestPrice = (json) => {

    productsContainer.innerHTML = ``;

    json.sort(function(a,b) {   // filtra os valores em ordem crescente
        return a.price < b.price ? -1 : (a.price > b.price ? 1 : 0);
    });

    for(let x = 0; x < json.length; x++) {

        if(json[x].type == 'baby') {

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



// Filtro maior valor 

filterByBiggestPrice = (json) => {

    productsContainer.innerHTML = ``;

    json.sort(function(a,b) {   // filtra os valores em ordem decrescente
        return a.price < b.price ? 1 : (a.price > b.price ? -1 : 0);
    });

    for(let x = 0; x < json.length; x++) {

        if(json[x].type == 'baby') {
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



// Filtro por COR (Decidi nao usar)

filterByColor = (json, color) => {

    productsContainer.innerHTML = ``;

    for(let x = 0; x < json.length; x++) {
        for(let z = 0; z < json[x].color.length; z++) { // Caso tenha mais de uma cor, percorre o array

            if(json[x].type == "baby" && json[x].color[z] == color) {
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




