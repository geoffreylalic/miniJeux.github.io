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

        this.temps = document.createElement("span");
        this.temps.id = "temps";
        this.temps.innerHTML = "--:--";
        this.blockScore.append(this.temps);
        this.startTemps = 1800; //1800 sec = 30 minutes


        this.divDrapeau = document.createElement("div");
        this.divDrapeau.innerHTML = "nombre de Drapeau: ";
        this.blockScore.append(this.divDrapeau);

        this.divMine = document.createElement("div");
        this.divMine.innerHTML = "nombre de mine: ";
        this.blockScore.append(this.divMine);
    }

    /**
     * Pour comparer les messages envoyés dans l'agent PAC
     * @param {*} message classe MESSAGE de PAC.js
     * @param {*} piecejointe objet envoyé à travers le PAC
     */
    reçoitMessage(message, piecejointe) {
        let result = "";
        if(this.nbDrapeau===0){
            this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.ARRETCLICKDROIT);
        }
        
        else if (message === MESSAGE.AJOUTDRAPEAU) {
            this.nbDrapeau--;
            this.divDrapeau.innerHTML= "nombre de Drapeau: " + this.nbDrapeau;
        }
        else if (message === MESSAGE.ENLEVEDRAPEAU) {
            this.nbDrapeau++;
            this.divDrapeau.innerHTML= "nombre de Drapeau: " + this.nbDrapeau;     
           }
        else if (message === MESSAGE.ENVOIEDRAPEAU) {
            this.nbDrapeau = piecejointe;
            this.divDrapeau.innerHTML= "nombre de Drapeau: " + this.nbDrapeau;
            this.divMine.innerHTML= "nombre de mine: " + this.nbDrapeau;
        }
        else if (message === MESSAGE.INIT) {
            this.interval = setInterval(() => this.chrono(message), 1000);
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
            
        } 
        else if (message === MESSAGE.AJOUTDRAPEAU) {
            this.pres.reçoitMessage(message);
        }
        else if (message === MESSAGE.ARRETCLICKDROIT) {
            this.pres.reçoitMessage(message);
        }
        else if (message === MESSAGE.ENLEVEDRAPEAU) {
            this.pres.reçoitMessage(message);
        }
        else if (message === MESSAGE.ENVOIEDRAPEAU) {
            this.pres.reçoitMessage(message,piecejointe);
        }

        else {
            result = super.reçoitMessageDuParent(message, piecejointe);
        }



        return result;

    }

    reçoitMessageDeLaPresentation(message, piecejointe) {
        let result = "";

        result = super.reçoitMessageDeLaPresentation(message, piecejointe);

        return result;
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        let result = "";


        result = super.reçoitMessageDeLAbstraction(message, piecejointe);
    }
}