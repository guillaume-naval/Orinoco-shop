
let basketContent = JSON.parse(localStorage.getItem("camera"));
console.log(basketContent);

// Remplissage des informations du panier (lecture du localStorage)

showBasket()
async function showBasket() {
    let total = 0;
    for (i=0; i< basketContent.length; i++) {
        let cameraId = basketContent[i];
        console.log(cameraId);
       
        function getProductData(cameraId) {
            return fetch("http://localhost:3000/api/cameras/" + cameraId)
                .then(function (res) {
                    return res.json()
                })
                .catch(function (error) {
                    alert(error)
                })

        }
        let cameraInfos = await getProductData(cameraId);
        total += cameraInfos.price/100;
        console.log(total);
        console.log(cameraInfos);

        document.getElementById("product_name").innerHTML += `
        <div>${cameraInfos.name}</div>
        `
        document.getElementById("product_price").innerHTML += `
        <div>${cameraInfos.price/100 +" €"}</div>
        `
        document.getElementById("product_total").innerHTML += `
        <div>${cameraInfos.price/100 +" €"}</div>
        `
    }
    document.getElementById("total__price").innerHTML += `
    <div>${total +" €"}</div>
    `
}

// Vider le panier

clearBasket()
function clearBasket() {
    let contentButtonClear = document.getElementById('clear-basket');
    let buttonClearBasket = document.createElement("button");

    contentButtonClear.appendChild(buttonClearBasket);
    buttonClearBasket.classList.add("btn-clear");
    buttonClearBasket.textContent = "Vider le panier";

    buttonClearBasket.addEventListener('click', function () {
        localStorage.clear();
        document.getElementById("basket-products").innerHTML = "";
        document.getElementById("total__price").innerHTML = "";
        })
}

