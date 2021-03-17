window.addEventListener("DOMContentLoaded", () => {
    let affPseudo = document.getElementById("pseudo");
    let affGeneral = document.getElementById("general");
    let affDem = document.getElementById("dem");
    let affMf = document.getElementById("mf");
    let affSucces = document.getElementById("succes");
    let listeJoueur = localStorage.getItem("listeJoueur");
    listeJoueur = JSON.parse(listeJoueur);
    console.log(listeJoueur);

    listeJoueur.forEach(joueur =>{
        if(joueur.actif === true){
            console.log(joueur);
            affPseudo.innerHTML = joueur.pseudo;
            affGeneral.innerHTML = "Vous avez joués " +(joueur.nbPartieMF + joueur.nbPartieDem) + " fois (Démineur et Motfléchés)"
            affDem.innerHTML = "Vous avez joués "+joueur.nbPartieDem+ " à Démineur";
            affMf.innerHTML = "Vous avez joués "+joueur.nbPartieMF+ " aux Mots Fléchés";
            if(joueur.nbPartieDem >=5){
                affSucces.innerHTML += '<p>"Grand Génie" débloqué, vous etes fort</p>'
            }if(joueur.nbPartieMF >=5){
                affSucces.innerHTML += '<p>"Grand Maître" débloqué, vous etes très fort</p>'
            }
        }else{
            console.log("pas de joueur actif");
        }
    })
});