main()

// FONCTION MAIN DE LA PAGE - AFFICHAGE DES PRODUITS

async function main() {
    const products = await getProducts()
    console.log(products)

    // Product card

    const mainContent = document.getElementById("main-home");

    for (product of products) {

        //Page du produit
        productPageLink = document.createElement("a");
        mainContent.appendChild(productPageLink);
        urlPage = "product.html?id=" + product._id;
        productPageLink.setAttribute('href', urlPage);
        productPageLink.setAttribute('class', "card__link");

        // Product Card
        let cardProduct = document.createElement("div");
        productPageLink.appendChild(cardProduct);
        cardProduct.setAttribute("class", "product");

        // Product name
        let nameProduct = document.createElement("h2");
        cardProduct.appendChild(nameProduct);
        nameProduct.textContent = product.name;
        nameProduct.setAttribute("class", "product__name");

        // Product image
        let imageProduct = document.createElement("img");
        cardProduct.appendChild(imageProduct);
        imageProduct.src = product.imageUrl;
        imageProduct.setAttribute("class", "product__img");

        // Product description
        let descriptionProduct = document.createElement("p");
        cardProduct.appendChild(descriptionProduct);
        descriptionProduct.textContent = product.description;
        descriptionProduct.setAttribute("class", "product__description");

        //Product du prix
        let priceProduct = document.createElement("p");
        cardProduct.appendChild(priceProduct);
        priceProduct.setAttribute("class", "price");
        priceProduct.textContent = product.price / 100 + ' €';
    }
}

// FETCH

function getProducts() {
    return fetch("http://localhost:3000/api/cameras")
        .then(function (res) {
            return res.json()
        })
        .catch(function (error) {
            alert(error)
        })
}



