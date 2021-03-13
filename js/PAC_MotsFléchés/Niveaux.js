class AbsNiveaux extends Abs {
    constructor() {
        super();

        this.listeNiveaux = [{
            nom : "Mot Fléchés",
            difficulté : "Facile",


        }]
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

class PresNiveaux extends Pres {
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


class CtrlNiveaux extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    reçoitMessageDuParent(message, piecejointe) {
        let result = "";


        result = super.reçoitMessageDuParent(message, piecejointe);



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