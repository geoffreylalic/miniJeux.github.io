class Case {
    constructor(ligne, colonne) {
        this.mine = false;
        this.ligne = ligne;
        this.colonne = colonne;
    }

}

class AbsGrille extends Abs {
    constructor() {
        super();
    }
}

class PresGrille extends Pres {
    constructor() {
        super();
        this.nbLignes = 9;
        this.nbColonnes = 9;

    }

    reçoitMessage(message, piecejointe) {
        if (message == MESSAGE.INIT) {
            console.log("reçoitmesasge");
            this.construireGrille();
        }
    }

    construireGrille() {
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            let div = document.createElement("div");
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                let span = document.createElement("span");
                div.appendChild(span);
            }
        }
        console.log("construireGrille");

    }


}


class CtrlGrille extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    init(){
        this.pres.reçoitMessage(MESSAGE.INIT);
        console.log("fct init")
    }

}