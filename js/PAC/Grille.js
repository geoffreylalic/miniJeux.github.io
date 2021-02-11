class AbsGrille extends Abs {
    constructor() {
        super();
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        /*else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;*/
    }
}

class PresGrille extends Pres {
    constructor() {
        super();
        this.nbLignes = 9;
        this.nbColonnes = 9;

        this.tabCase;

        this.grille = document.createElement("div");
        this.grille.id = 'grille';
        document.body.append(this.grille);

    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.INIT) {
            this.construireGrille();
            this.construireMine();
        }

        //message non implémenté
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }


    construireGrille() {
        this.tabCase = create2DArray(this.nbLignes);
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                let div = document.createElement("div");
                this.grille.append(div);
                this.tabCase[ligne][colonne] = new Case(ligne,colonne);
            }

        }

    }

    construireMine() {
        let toutesLesDivs = document.querySelectorAll("#grille div");

        toutesLesDivs.forEach((div, index) => {
            //console.log(index)
            let ligne = Math.floor(index / this.nbLignes);
            let colonne = index % this.nbColonnes;


            div.dataset.ligne = ligne;
            div.dataset.colonne = colonne;
            div.append(this.tabCase[ligne][colonne].image);
        })
    }
}


class CtrlGrille extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    init() {
        this.pres.reçoitMessage(MESSAGE.INIT);
        console.log("fct init");
    }

}