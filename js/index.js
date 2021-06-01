main()


// FONCTION MAIN DE LA PAGE

async function main() {
    const products = await getProducts()
    console.log(products)

    for (product of products) {
        displayProducts(product)
    }
}


// FETCH API

function getProducts() {
    return fetch("http://localhost:3000/api/cameras")
        .then(function (response) {
            return response.json()
        })
        .then(function (products) {
            return products
        })
        .catch(function (error) {
            alert(error)
        })
}

// AFFICHAGE DES PRODUITS

function displayProducts() {
    document.getElementById("main").innerHTML += `
    <article class="product">
        <h2 id="product__name" class="product_name" >${product.name}</h2>
        <p id="product__description" class="product_description">${product.description}</p>
    </article>`
}