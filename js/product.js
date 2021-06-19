//Récupération l'id à partir de l'URL
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const cameraId = urlParams.get('id')
console.log(cameraId);

//Affichage des informations d'un seul produit

displayCamera()

const mainProduct = document.getElementById("main-product");

async function displayCamera() {
    const cameraInfos = await getProductData(cameraId);
    console.log(cameraInfos)

    //Création de la Card

    // Camera Card
    let cardProduct = document.createElement("div");
    mainProduct.appendChild(cardProduct);
    cardProduct.setAttribute("class", "camera");

    // Camera image
    let imageProduct = document.createElement("img");
    cardProduct.appendChild(imageProduct);
    imageProduct.src = cameraInfos.imageUrl;
    imageProduct.setAttribute("class", "camera__img");

    // Camera content
    let contentProduct = document.createElement("div");
    cardProduct.appendChild(contentProduct);
    contentProduct.setAttribute("class", "camera__content");

    //Camera name
    let nameProduct = document.createElement("h2");
    contentProduct.appendChild(nameProduct);
    nameProduct.textContent = cameraInfos.name;
    nameProduct.setAttribute("class", "camera__name");

    // Camera description
    let descriptionProduct = document.createElement("p");
    contentProduct.appendChild(descriptionProduct);
    descriptionProduct.textContent = cameraInfos.description;
    descriptionProduct.setAttribute("class", "camera__description");

    // Camera Lenses
    let lensList = document.createElement("select");
    lensList.setAttribute("required", "required");
    contentProduct.appendChild(lensList);
    lensList.setAttribute("id", "camera__lens");

    //Lenses options
    let chooseOne = document.createElement("option")
    lensList.appendChild(chooseOne);
    chooseOne.setAttribute("value", "");
    chooseOne.textContent = "Choisissez l'objectif ...";

    for (i = 0; i < cameraInfos.lenses.length; i++) {
        let lensChoice = document.createElement("option")
        cameraLens = cameraInfos.lenses[i];
        lensChoice.setAttribute("value", cameraLens);
        lensList.appendChild(lensChoice);
        lensChoice.textContent = cameraInfos.lenses[i];
    }
    // Camera price
    let priceProduct = document.createElement("p");
    contentProduct.appendChild(priceProduct);
    priceProduct.setAttribute("class", "camera__price");
    priceProduct.textContent = cameraInfos.price / 100 + ' $';

    // Add to cart button
    let addCartButton = document.createElement("button");
    contentProduct.appendChild(addCartButton);
    addCartButton.setAttribute("class", "addcart__button");
    addCartButton.setAttribute("id", "addcart__button");
    addCartButton.textContent = "Ajouter au panier";

    addCameratoCart(addCartButton, cameraId)

    // Local storage

    function addCameratoCart(button, cameraToCart) {

        // Button event listener
        button.addEventListener("click", function () {

            let cartContent = JSON.parse(localStorage.getItem("camera"));
            button.textContent = "Ajouté !";

            // check du panier

            // Présence de produits dans le panier
            if (cartContent) {
                cartContent.push(cameraToCart);
                localStorage.setItem("camera", JSON.stringify(cartContent));
                console.log(cartContent);
            }
            // Pas de produits dans le panier
            else {
                cartContent = [];
                cartContent.push(cameraToCart);
                localStorage.setItem("camera", JSON.stringify(cartContent));
                console.log(cartContent);
            }
        });
    }
}


//Fetch un seul produit

function getProductData(cameraId) {
    return fetch("http://localhost:3000/api/cameras/" + cameraId)
        .then(function (res) {
            return res.json()
        })
        .catch(function (error) {
            alert(error)
        })
}

/*document.getElementById("main-product").innerHTML == `
        < article class="camera" >
            <img class="camera__img" src="${cameraInfos.imageUrl}">
                <div class="camera__content">
                    <h2 class="camera__name">${cameraInfos.name}</h2>
                    <p class="camera__description">${cameraInfos.description}</p>
                    <p class="camera__price">${cameraInfos.price / 100} $</p>
                    <select class="camera__lense" id="camera__lense">
                        <option value""> Choose a lense </option>
                    </select >
                </div>
        </article>`

    let varLense = ""
    for (i = 0; i < cameraInfos.lenses.length; i++) {
        varLense += "<option value=${" + cameraInfos.lenses[i] + "}>${cameraInfos.lenses[i]}</option>";
    }
    document.getElementById("camera__lense").innerHTML = varLense;
*/