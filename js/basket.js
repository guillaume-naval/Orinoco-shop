
let basketContent = JSON.parse(localStorage.getItem("camera"));

let products= basketContent;
console.log(products);
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
    localStorage.setItem("total", total);
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

//Vérification formulaire

validateForm()
function validateForm() {
    let contenerButton = document.getElementById('confirm-contener');
    let buttonValidate = document.createElement("button");
    contenerButton.appendChild(buttonValidate);
    buttonValidate.setAttribute("id", "btn-commande");
    let buttonOrder = document.getElementById('btn-commande');
    buttonValidate.textContent = "Confirmer la commande";

    buttonOrder.addEventListener('click', function () {
        let firstname = document.getElementById('firstName').value;
        let lastname = document.getElementById('lastName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;

        if (firstname.length<= 2 &&lastname.length<= 2 &&address.length<= 2  && city.length <= 2 && email.length <=2) {
            alert("Saisissez tous les champs doivent contenir au moins 2 caractères");
            return false;
        } else if (email=!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            alert("Entrez un email valide");
            return false;
        } else {
            confirmationOrder();
            return true;     
        }
               
    })
}

function confirmationOrder() {
    let firstname = document.getElementById('firstName').value;
    let lastname = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
   
    contact = {firstName:firstname, lastName:lastname, address:address, city:city,email:email };
    dataToPost = JSON.stringify({ contact, products });
    
        console.log(dataToPost);
        postForm(dataToPost);
}

// Récupération de l'ID de la réponse de l'API et stockage
function getOrderConfirmationId(responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
}

// Fonction qui envoie les informations du formulaire et du panier
async function postForm(dataToPost) {
    try {
        let response = await fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: dataToPost,
        });
        if (response.ok) {
            let responseId = await response.json();
            getOrderConfirmationId(responseId);
            window.location.href = "confirm.html";
            console.log(responseId);
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}