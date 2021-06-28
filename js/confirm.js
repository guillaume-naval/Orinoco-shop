//Afficher numéro commande
const confirmationId = localStorage.getItem("orderConfirmationId");
const totalprice = localStorage.getItem("total");
let orderConfirm = document.createElement("div");
orderConfirm.setAttribute("id", "message__order");
document.getElementById("main-confirm").appendChild(orderConfirm);

document.getElementById("message__order").innerHTML = "Merci pour votre commande n° " + confirmationId +"  d'un prix total de "+ totalprice+ " €"+`
<p>À Bientôt !</p>
`;

localStorage.clear();
