window.addEventListener("DOMContentLoaded", () => {
    let affPseudo = document.getElementById("pseudo");
    let affGeneral = document.getElementById("general");
    let affDem = document.getElementById("dem");
    let affMf = document.getElementById("mf");
    let affSucces = document.getElementById("succes");
    let listeJoueur = localStorage.getItem("listeJoueur");
    listeJoueur = JSON.parse(listeJoueur);
    console.log(listeJoueur);

    let trouve = false;
    listeJoueur.forEach(joueur => {
        if (joueur.actif === true) {
            trouve = true;
            console.log(joueur);
            affPseudo.innerHTML = joueur.pseudo;
            affGeneral.innerHTML = "Vous avez joué " + (joueur.nbPartieMF + joueur.nbPartieDem) + " fois (Démineur et Motfléchés)"
            affDem.innerHTML = "Vous avez joué " + joueur.nbPartieDem + " fois";
            affMf.innerHTML = "Vous avez joué " + joueur.nbPartieMF + " fois";
            if (joueur.nbPartieDem >= 5) {
                affSucces.innerHTML += '<p>"Grand Génie" débloqué, vous etes fort</p>'
            } if (joueur.nbPartieMF >= 5) {
                affSucces.innerHTML += '<p>"Grand Maître" débloqué, vous etes très fort</p>'
            }
        }
    });
    if(trouve === false){
        affPseudo.innerHTML = "Aucun compte";
    }
});