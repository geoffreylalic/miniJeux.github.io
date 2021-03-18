/** En JavaScript on ne peut pas déclarer directement de tableau à n dimensions
   en précisant toutes les dimensions. tab [4][4] n'est pas possible par exemple.
   On déclare en général un tableau à une dimension de taille varialbe (ci-dessous 
   let arr = []) puis ensuite pour chacune des lignes du tableau, on lui affecte un autre
   tableau (arr[i] = [] ci-dessous) */

function create2DArray(rows, columns) {
    let arr = [];

    for (let l = 0; l < rows; l++) {
        for (let c = 0; c < columns; c++) {
            arr[l] = [];
        }
    }
    return arr;
}
window.addEventListener("DOMContentLoaded", () => {
    console.log("niveau " + localStorage.getItem("niveau"));

    //pour afficher le pseudo actifd dans la navbar
    let pseudoNav = document.querySelector("#pseudoNav");
    let chargementJoueur = localStorage.getItem("listeJoueur");
    chargementJoueur = JSON.parse(chargementJoueur);
    let joueurActif;
    let trouve = false;
    chargementJoueur.forEach(joueur => {
        if (joueur.actif === true) {
            trouve = true;
            joueurActif = joueur;
            pseudoNav.innerHTML = joueurActif.pseudo;
        } 
    });
    if (trouve === false){
            pseudoNav.innerHTML = "aucun"
    }

});

