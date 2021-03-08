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

        this.score = document.createElement("div");
        this.score.innerHTML = "bonjour";
        document.body.append(this.score);
    }

    /**
     * Pour comparer les messages envoyés dans l'agent PAC
     * @param {*} message classe MESSAGE de PAC.js
     * @param {*} piecejointe objet envoyé à travers le PAC
     */
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.INIT){
            console.log("dans presenation score");
        }
        else{
            result = super.reçoitMessage(message, piecejointe);
        }
        
        return result;
    }




}


class CtrlScore extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    reçoitMessageDuParent(message, piecejointe) {
        let result = "";

        if(message === MESSAGE.INIT){
            this.init();
        }else{
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

    init() {
        this.pres.reçoitMessage(MESSAGE.INIT);
    }


}