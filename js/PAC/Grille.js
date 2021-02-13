class AbsGrille extends Abs {
    constructor() {
        super();
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.CASE_CLICK) {
            this.verificationMine(piecejointe);
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

    verificationMine(piecejointe) {
        let caseClick = piecejointe;
        if (caseClick.mine === true) {
            console.log("mine " + piecejointe);

        } else if (caseClick.mine === false) {
            console.log("pas mine " + piecejointe);
        }
    }

}

class PresGrille extends Pres {
    constructor() {
        super();
        this.nbLignes = 9;
        this.nbColonnes = 9;

        this.tabCase;

        this.nbMines = 10;

        this.grille = document.createElement("div");
        this.grille.id = 'grille';
        document.body.append(this.grille);

        //écouteur sur la grille
        //let grilleListenner = document.querySelector('#grille')
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.INIT) {
            this.construireGrille();
            this.remplirTableau();

        } else if (message == MESSAGE.CLICK) {
            this.dessineMine(piecejointe);
            this.clickSurMine(piecejointe);
        }

        //message non implémenté
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

    // on obtient la case clické
    dessineMine(piecejointe) {
        let divClick=piecejointe;
        let ligne = divClick.dataset.ligne;
        let colonne = divClick.dataset.colonne;
        if(this.tabCase[ligne][colonne].mine){
            divClick.append(this.tabCase[ligne][colonne].image);
        }

    }

    //si le joueur click sur une mine toutes les mines se révèlent
    clickSurMine(piecejointe){
        let divClick=piecejointe;
        let ligne = divClick.dataset.ligne;
        let colonne = divClick.dataset.colonne;
        let toutesLesDivs = document.querySelectorAll("#grille div");
        if(this.tabCase[ligne][colonne].mine){
            toutesLesDivs.forEach(div =>{
                if(this.tabCase[div.dataset.ligne][[div.dataset.colonne]].mine){
                    div.append((this.tabCase[div.dataset.ligne][div.dataset.colonne].image));
                }
            })
        }
    }

    construireGrille() {
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                let div = document.createElement("div");
                this.grille.append(div);
                div.dataset.ligne = ligne;
                div.dataset.colonne = colonne;
            }
        }
    }

    remplirTableau() {
        this.tabCase = create2DArray(this.nbLignes);
        let toutesLesDivs = document.querySelectorAll("#grille div");
        let ligne;
        let colonne;
        toutesLesDivs.forEach(div => {
            ligne = div.dataset.ligne;
            colonne = div.dataset.colonne;
            let mine = Math.floor(1 + Math.random() * 2);
            switch (mine) {
                case 1:
                    this.tabCase[ligne][colonne] = new Case(ligne, colonne, true);
                    div.dataset.mine=true;
                    break;
                case 2:
                    this.tabCase[ligne][colonne] = new Case(ligne, colonne, false);
                    div.dataset.mine=false;
                    break;
            }
        })
    }

}


class CtrlGrille extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    reçoitMessageDeLaPresentation(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.CASE_CLICK) {
            let caseClick = piecejointe;
            this.abs.reçoitMessage(MESSAGE.CASE_CLICK, caseClick);
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

    init() {
        this.pres.reçoitMessage(MESSAGE.INIT);
        //abonnement de la fonction à l'écouteur
        this.pres.grille.addEventListener("click", (evt) => {
            let clickCible = evt.target;
            this.pres.reçoitMessage(MESSAGE.CLICK, clickCible);
        });
    }


}