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
        this.nbPoints = 0;
        this.nbClick = 0;

        this.blockScore = document.createElement("div");
        document.body.appendChild(this.blockScore);

        this.titre = document.createElement("h2");
        this.titre.innerHTML = "Score";
        this.blockScore.appendChild(this.titre);

        this.temps = document.createElement("span");
        this.temps.innerHTML = "00:00";
        this.blockScore.append(this.temps);

        this.motTrouveLigne = document.createElement("div");
        this.motTrouveLigne.innerHTML = "Mots trouvés sur les lignes : ";
        this.blockScore.append(this.motTrouveLigne);

        this.motTrouveLigne = document.createElement("div");
        this.motTrouveLigne.innerHTML = "Mots trouvés sur les colonnes : ";
        this.blockScore.append(this.motTrouveLigne);

        this.btnTriche = document.createElement("button");
        this.btnTriche.id = "btnTriche";
        this.btnTriche.innerHTML = "Triche";
        this.blockScore.append(this.btnTriche);

        this.btnRejouer = document.createElement("button");
        this.btnRejouer.innerHTML = "Rejouer";
        this.btnRejouer.id = "btnRejouer";
        this.blockScore.append(this.btnRejouer);
    }

    /**
     * Pour comparer les messages envoyés dans l'agent PAC
     * @param {*} message classe MESSAGE de PAC.js
     * @param {*} piecejointe objet envoyé à travers le PAC
     */
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.INIT) {
            this.chrono();
            this.btnTriche.addEventListener("click", () => this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.CLICK_TRICHE));
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }

        return result;
    }

    //todo :implémenter un chronomètre
    chrono() {

    }

    ajoutPoints() {
        let score = parseInt(this.scoreNum.innerHTML);
        score += 15;
        this.scoreNum.innerHTML = score;
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
        else {
            result = super.reçoitMessageDuParent(message, piecejointe);
        }



        return result;

    }

    reçoitMessageDeLaPresentation(message, piecejointe) {
        let result = "";

        if (message === MESSAGE.CLICK_TRICHE) {
            piecejointe = "rien";
            this.parent.reçoitMessageDUnEnfant(message,piecejointe,this);
        } else {
            result = super.reçoitMessageDeLaPresentation(message, piecejointe);
        }


        return result;
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        let result = "";


        result = super.reçoitMessageDeLAbstraction(message, piecejointe);
    }


}