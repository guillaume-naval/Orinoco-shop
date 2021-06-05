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
    const cameraInfos = await getProductData(cameraId)
    console.log(cameraInfos)

    //Création de la Card
    document.getElementById("main-product").innerHTML += `
        <article class="camera">
            <img class="camera__img" src="${cameraInfos.imageUrl}">
            <div class="camera__content">
                <h2 class="camera__name">${cameraInfos.name}</h2>
                <p class="camera__description">${cameraInfos.description}</p>
                <p class="price">${cameraInfos.price} $</p>
            </div>
        </article>`
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

