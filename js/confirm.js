//Afficher numéro commande
const confirmationId = localStorage.getItem("orderConfirmationId");
const totalprice = localStorage.getItem("total");
let orderConfirm = document.createElement("div");
orderConfirm.setAttribute("id", "message__order");
document.getElementById("main-confirm").appendChild(orderConfirm);

document.getElementById("message__order").innerHTML = "Merci pour votre commande n° " + confirmationId +"  d'un prix total de "+ totalprice+ " €"+`
<p>À Bientôt !</p>
`;


// Vider le panier, le prix total et l'id de commande

/*resetOrder()
function resetOrder() {
     let resetOrder = document.querySelectorAll("resetBasket") 
    resetHome = document.getElementById('reset-home');
    resetCart = document.getElementById('reset-cart');

    
    resetHome.addEventListener('click', function () {
        localStorage.clear();
    })
        

    document.addEventListener('click', function(e){
        if(e.target.tagName=="a"){
            localStorage.clear();
        }
      })*/

const resetBasket = document.querySelector('.reset');

resetBasket.addEventListener('click', (e)=>{
    localStorage.clear();
});
