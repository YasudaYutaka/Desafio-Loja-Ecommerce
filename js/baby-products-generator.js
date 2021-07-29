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




