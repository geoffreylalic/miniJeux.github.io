window.addEventListener("DOMContentLoaded", () => {
    let chargementJoueur = localStorage.getItem("listeJoueur");
    if (chargementJoueur === null) {
        let listeJoueur = [];
        listeJoueur = JSON.stringify(listeJoueur)
        localStorage.setItem("listeJoueur", listeJoueur);

    }
    let listeJoueur = localStorage.getItem("listeJoueur");
    listeJoueur = JSON.parse(listeJoueur);
    console.log(listeJoueur);

});