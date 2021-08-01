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

// pegar parametro URL
let query = location.search; // pega querystring da pagina 
let keyValue = query.split('='); //divide em um array
let catValue = keyValue[1]; // pega valor do id em string (baby ou kid)

// Gera HTML do produto 
generateHTML = (json, x) => {
    productsContainer.innerHTML += `

            <div class="single-product">
                <img src="`+json[x].img+`">
                <span class="catalog-line"></span>
                <p class="product-title">`+json[x].name+`</p>
                <p class="product-price">R$`+json[x].price+`,00</p>
                <form method='get' action="product.html">
                    <input type="hidden" value="`+json[x].id+`" name='id'/>
                    <button class="product-button" type="submit">Comprar</button>
                </form>
            </div>

    `
}

// Percorre o JSON e gera
generateProducts = () => {
    requestJSON();
    for(let x = 0; x < jsonObject.products.length; x++) {
        if(jsonObject.products[x].type ==catValue) {
            generateHTML(jsonObject.products, x);
        }
    }
}

generateProducts();




/******************************************************************************** FILTRO ******************************************************************************/

let json = jsonObject.products; 

// Seleciona a funcao de acordo com a opcao selecionada

selectedFilter = () => {

    let selectedOption = document.getElementsByClassName('form-select')[0].value;

    if(selectedOption == 'price-ascending') {
        filterByLowestPrice(json);
    } else if(selectedOption == 'price-descending') {
        filterByBiggestPrice(json);
    } 

}


// Filtro preco minimo e maximo 

let filterCount = 0;

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

            filterCount++;
            if(filterCount % 2 == 0) { // caso a pessoa clique duas vezes no botao gera outro json para evitar de n ter produtos
                json = jsonObject.products;
                if (filterCount == 2) { // reseta para filtro para evitar bugs
                    filterCount = 1; 
                }
            }

            productsContainer.innerHTML = ``;

            json = json.filter(function(a) {
                return a.price >= min && a.price <= max;
            });


            for(let x = 0; x < json.length; x++) {

                if(json[x].type == catValue) {
        
                    generateHTML(json, x);;
                }
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

        if(json[x].type == catValue) {

            generateHTML(json, x);;
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

        if(json[x].type == catValue) {
            generateHTML(json, x);;

        }
    }

}



// Filtro por COR (Decidi nao usar)

filterByColor = (json, color) => {

    productsContainer.innerHTML = ``;

    for(let x = 0; x < json.length; x++) {
        for(let z = 0; z < json[x].color.length; z++) { // Caso tenha mais de uma cor, percorre o array

            if(json[x].type == catValue && json[x].color[z] == color) {
                generateHTML(json, x);;
            }

        }
    }
}

// Reseta os filtros

resetFilter = () => {
    productsContainer.innerHTML = ``;
    json = jsonObject.products; 
    document.getElementById('min-value').value = "";
    document.getElementById('max-value').value = "";
    document.getElementsByClassName('form-select')[0].value = "default";
    generateProducts();
}
