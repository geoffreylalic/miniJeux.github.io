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

        this.titre = document.createElement("h2");
        this.titre.innerHTML="Score";
        document.body.appendChild(this.titre);

        this.scoreTxt = document.createElement("div");
        this.scoreTxt.innerHTML = "Points : ";
        document.body.append(this.scoreTxt);

        this.scoreNum = document.createElement("span");
        this.scoreNum.innerHTML= " - ";
        this.scoreTxt.append(this.scoreNum);
    }

    /**
     * Pour comparer les messages envoyés dans l'agent PAC
     * @param {*} message classe MESSAGE de PAC.js
     * @param {*} piecejointe objet envoyé à travers le PAC
     */
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.INIT){
            this.scoreNum.innerHTML = "0";
        } else if(message === MESSAGE.POINT){
            this.ajoutPoints();
        }
        else{
            result = super.reçoitMessage(message, piecejointe);
        }
        
        return result;
    }

    ajoutPoints(){
        let score = parseInt(this.scoreNum.innerHTML);
        score +=15;
        this.scoreNum.innerHTML = score;
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
        }else if(message === MESSAGE.POINT){
            this.pres.reçoitMessage(message);
        }
        else{
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