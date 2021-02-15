class AbsGrille extends Abs {
    constructor() {
        super();
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        result = super.reçoitMessage(message, piecejointe);
        return result;
    }


}

class PresGrille extends Pres {
    constructor() {
        super();
        this.nbLignes = 9;
        this.nbColonnes = 9;

        this.tabCase;

        this.nbMines = 10;
        this.tabMine = [];

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
            this.clickSurCase(piecejointe);
        }

        //message non implémenté
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

    // on obtient la case clické
    dessineMine(piecejointe) {
        let divClick = piecejointe;
        let ligne = divClick.dataset.ligne;
        let colonne = divClick.dataset.colonne;
        if (this.tabCase[ligne][colonne].mine === true) {
            divClick.append(this.tabCase[ligne][colonne].image);
        }

    }

    //si le joueur click sur une mine toutes les mines se révèlent
    clickSurCase(piecejointe) {
        let divClick = piecejointe;
        let ligne = divClick.dataset.ligne;
        let colonne = divClick.dataset.colonne;
        let toutesLesDivs = document.querySelectorAll("#grille div");
        if (this.tabCase[ligne][colonne].mine) {
            toutesLesDivs.forEach(div => {
                if (this.tabCase[div.dataset.ligne][div.dataset.colonne].mine) {
                    div.append((this.tabCase[div.dataset.ligne][div.dataset.colonne].image));
                }
            })
        }
    }

    //la construction dépend du css
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
        let indexCase;
        let ligne;
        let colonne;

        // pour avoir nos this.nbMine aléatoire dans la grille 
        for (let caseCourante = 0; caseCourante < this.nbMines; caseCourante++) {
            indexCase = Math.floor(Math.random() * toutesLesDivs.length);
            toutesLesDivs.forEach((div, index) => {
                ligne = div.dataset.ligne;
                colonne = div.dataset.colonne;
                if (index === indexCase) {
                    if (this.tabCase[ligne][colonne] === undefined) {
                        this.tabCase[ligne][colonne] = new Case(ligne, colonne, true);
                    }
                    else if (typeof (this.tabCase[ligne][colonne]) === 'object') {
                        console.log('else de remplir');
                        indexCase = Math.floor(Math.random() * toutesLesDivs.length)
                        index = indexCase;
                        if (this.tabCase[ligne][colonne] === undefined) {
                            this.tabCase[ligne][colonne] = new Case(ligne, colonne, true);
                        }
                    }
                }
            });
        }


        // on crée les case non miné
        toutesLesDivs.forEach(div => {
            ligne = div.dataset.ligne;
            colonne = div.dataset.colonne;
            if (this.tabCase[ligne][colonne] === undefined) {
                this.tabCase[ligne][colonne] = new Case(ligne, colonne, false);
            }
        })

        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                //console.log(this.tabCase[ligne][colonne]);
            }
        }

    }

}


class CtrlGrille extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
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
        //abonnement de la fonction à l'écouteur
        this.pres.grille.addEventListener("click", (evt) => {
            let clickCible = evt.target;
            this.pres.reçoitMessage(MESSAGE.CLICK, clickCible);
        });
    }


}