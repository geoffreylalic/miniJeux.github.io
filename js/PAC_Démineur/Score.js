class AbsScore extends Abs {
    constructor() {
        super();
    }

    /**
     * Pour comparer les messages envoyés dans l'agent PAC
     * @param {*} message classe MESSAGE de PAC.js
     * @param {*} piecejointe objet envoyé à travers le PAC
     */
    reçoitMessage(message, piecejointe) {
        let result = "";
        result = super.reçoitMessage(message, piecejointe);
        return result;
    }

}

class PresScore extends Pres {
    constructor() {
        super();
        this.blockScore = document.querySelector("#score");
        this.blockScore.classList.add("text-white");

        this.titre = document.createElement("h2");
        this.titre.innerHTML = "Score";
        this.blockScore.appendChild(this.titre);

        this.difficulte = document.createElement("div");
        this.difficulte.id = "difficulté";
        this.difficulte.innerHTML = "Difficulté : ";
        this.blockScore.append(this.difficulte);

        this.temps = document.createElement("span");
        this.temps.id = "temps";
        this.temps.innerHTML = "--:--";
        this.blockScore.append(this.temps);
        this.startTemps = 1800; //1800 sec = 30 minutes


        this.divDrapeau = document.createElement("div");
        this.divDrapeau.innerHTML = "nombre de drapeau: ";
        this.blockScore.append(this.divDrapeau);

        this.divMine = document.createElement("div");
        this.divMine.innerHTML = "nombre de mine: ";
        this.blockScore.append(this.divMine);


        this.btnTriche = document.createElement("button");
        this.btnTriche.id = "btnTriche";
        this.btnTriche.innerHTML = "Triche";
        this.btnTriche.classList.add("row");
        this.blockScore.append(this.btnTriche);

        this.btnRejouer = document.createElement("button");
        this.btnRejouer.innerHTML = "Rejouer";
        this.btnRejouer.id = "btnRejouer";
        this.btnRejouer.classList.add("row");
        this.blockScore.append(this.btnRejouer);

        this.btnChangeNiv = document.createElement("button");
        this.btnChangeNiv.innerHTML = "Changer de niveau";
        this.btnChangeNiv.classList.add("row");
        this.blockScore.append(this.btnChangeNiv);

        this.btnQuitter = document.createElement("button");
        this.btnQuitter.innerHTML = "Quitter";
        this.btnQuitter.classList.add("row");
        this.blockScore.append(this.btnQuitter);
    }

    /**
     * Pour comparer les messages envoyés dans l'agent PAC
     * @param {*} message classe MESSAGE de PAC.js
     * @param {*} piecejointe objet envoyé à travers le PAC
     */
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.INIT) {
            this.interval = setInterval(() => this.chrono(message), 1000);
            this.btnTriche.addEventListener("click", () => this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.CLICK_TRICHE));
            this.btnRejouer.addEventListener("click", () => { window.location.href = "indexDemineur.html"; });
            this.btnQuitter.addEventListener("click", () => {
                window.location.reload();
            });
            this.btnChangeNiv.addEventListener("click", () => {
                window.location.href = "niveauxDémineur.html";
            });
        } else if (message === MESSAGE.ENVOIEDRAPEAU) {
            this.divDrapeau.innerHTML = "nombre de drapeau: " + piecejointe;
        } else if (message === MESSAGE.ENVOIEMINES) {
            this.divMine.innerHTML = "nombre de mine: " + piecejointe;
        }
        else if (message === MESSAGE.GAGNER) {
            this.finTemps(message);
        } else if (message === MESSAGE.PERDU) {
            this.finTemps(message);
        } else if (message === MESSAGE.CLICK_TRICHE) {
            this.finTemps(message);
        }else if(message === MESSAGE.DIFFICULTE){
            this.difficulte.innerHTML = "Difficulté : " + piecejointe;
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }
    rejouerScore() {
        //pour le chrono
        this.startTemps = 1800;
        clearInterval(this.interval);
        this.interval = setInterval(() => this.chrono(MESSAGE.INIT), 1000);
    }
    chrono(message) {
        let minutes = Math.floor(this.startTemps / 60);
        let secondes = this.startTemps % 60;
        let affichageTemps = document.getElementById("temps");
        this.startTemps--;
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (secondes < 10) {
            secondes = "0" + secondes;
        }
        if (minutes <= 0 && secondes <= 0) {
            this.finTemps(message);
        }
        if (this.startTemps % 2 === 1) {
            affichageTemps.innerHTML = minutes + ":" + secondes;
        } else {
            affichageTemps.innerHTML = minutes + " " + secondes;
        }

    }

    finTemps(message) {
        clearInterval(this.interval);
        let affichageTemps = document.getElementById("temps");
        if (message === MESSAGE.INIT) {
            affichageTemps.innerHTML += "Fin du temps imparti";
            alert("Fin du temps imparti, vous avez perdu!");
        } else if (message === MESSAGE.GAGNER) {
            affichageTemps.innerHTML += " Vous avez gagné!";
        } else if (message === MESSAGE.PERDU) {
            affichageTemps.innerHTML += " Vous avez perdu!";
        } else if (message === MESSAGE.CLICK_TRICHE) {
            affichageTemps.innerHTML += " Vous avez triché!";
        }
    }


}


class CtrlScore extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }
    reçoitMessageDuParent(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.INIT) {
            this.pres.reçoitMessage(message);
        } else if (message === MESSAGE.ENVOIEDRAPEAU) {
            this.pres.reçoitMessage(message, piecejointe);
        } else if (message === MESSAGE.ENVOIEMINES) {
            this.pres.reçoitMessage(message, piecejointe);
        }
        else if (message === MESSAGE.GAGNER) {
            this.pres.reçoitMessage(message);
        } else if (message === MESSAGE.PERDU) {
            this.pres.reçoitMessage(message);
        } else if(message === MESSAGE.DIFFICULTE){
            this.pres.reçoitMessage(message,piecejointe);
        }

        else {
            result = super.reçoitMessageDuParent(message, piecejointe);
        }



        return result;

    }

    reçoitMessageDeLaPresentation(message, piecejointe) {
        let result = "";

        if (message === MESSAGE.CLICK_TRICHE) {
            piecejointe = "";
            this.parent.reçoitMessageDUnEnfant(message, piecejointe, this);
            this.pres.reçoitMessage(message);
        } else if (message === MESSAGE.CLICK_INDICE) {
            piecejointe = "";
            this.parent.reçoitMessageDUnEnfant(message, piecejointe, this);
        }
        else {
            result = super.reçoitMessageDeLaPresentation(message, piecejointe);
        }


        return result;
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        let result = "";


        result = super.reçoitMessageDeLAbstraction(message, piecejointe);
    }
}