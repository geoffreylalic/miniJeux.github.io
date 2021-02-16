class AbsGrille extends Abs {
    constructor() {
        super();
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.CASE_CLICK) {
            this.verificationMine(piecejointe);
        }
        else if (message == MESSAGE.TABLEAU_CASE) {
            //on réalise la diffusion à partir de la présentation
            this.diffusion(piecejointe[0], piecejointe[1]);
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }


    getLigneColonne(piecejointe) {
        let tabCoordonnes = [piecejointe.ligne, piecejointe.colonne];
        return tabCoordonnes;
    }

    // to do: mettre en parametre une case et pas un tableau de case
    diffusion(tableauCase, caseCourante) {
        let tabCasePres = tableauCase;

        //on convertie en int les coordonnées
        let ligneCaseCourante = caseCourante.ligne;
        let colonneCaseCourante = caseCourante.colonne;

        //on défini les position par rapport à la position courante de la case
        //on regarde si on sort de la limite de la grille (bords)

        //Case au sud
        if (tabCasePres[ligneCaseCourante + 1] === undefined) {
            void (0);
        } else {
            let caseSud = tabCasePres[ligneCaseCourante + 1][colonneCaseCourante];
            if (caseSud.mine === false) {
                this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.DIFFUSION, caseSud);
                this.diffusion(tabCasePres, caseSud);
            }
        }

        //Case au nord
        if (tabCasePres[ligneCaseCourante - 1] === undefined) {
            void (0);
        } else {
            let caseNord = tabCasePres[ligneCaseCourante - 1][colonneCaseCourante];
            if (caseNord.mine === false) {
                this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.DIFFUSION, caseNord);
                this.diffusion(tabCasePres, caseNord);
            }
        }



        //Case au ouest  
        let caseOuest = tabCasePres[ligneCaseCourante][colonneCaseCourante - 1];
        if (caseOuest === undefined) {
            void (0);
        } else if (caseOuest.mine === false) {
            this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.DIFFUSION, caseOuest);
            this.diffusion(tabCasePres, caseOuest);
        }


        //Case au est 
        let caseEst = tabCasePres[ligneCaseCourante][colonneCaseCourante + 1];
        if (caseEst === undefined) {
            void (0);
        } else if (caseEst.mine === false) {
            this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.DIFFUSION, caseEst);
            this.diffusion(tabCasePres, caseEst);
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
        else if (message == MESSAGE.DIFFUSION) {
            //on recherche dans la grille la case qui doit etre dévoilé non miné
            this.rechercheDansGrille(piecejointe);
        }

        //message non implémenté
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

    rechercheDansGrille(piecejointe) {
        console.log('dans la grille');
        let toutesLesDivs = document.querySelectorAll("#grille div");
        toutesLesDivs.forEach(div => {
            if (div.dataset.ligne === piecejointe.ligne && div.dataset.colonne === piecejointe.colonne) {
                this.caseNonMine(div);
            }
        })
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
        else if (!this.tabCase[ligne][colonne].mine) {
            //on envoie la case avec son tableau à l'abstraction
           
            this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.TABLEAU_CASE, [this.tabCase, this.tabCase[ligne][colonne]]);
            this.caseNonMine(divClick);
        }

    }

    /**
     * Pour changer la couleur d'une case qui n'est pas miné une clické
     * @param {*} div 
     */
    caseNonMine(div) {
        div.classList.add('caseClick');
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
        if (message == MESSAGE.CASE_CLICK) {
            let caseClick = piecejointe;
            this.abs.reçoitMessage(MESSAGE.CASE_CLICK, caseClick);
        }
        else if (message == MESSAGE.TABLEAU_CASE) {
            this.abs.reçoitMessage(MESSAGE.TABLEAU_CASE, piecejointe);
        }

        /*else if (message == MESSAGE.DIFFUSION) {
            this.pres.reçoitMessage(MESSAGE.DIFFUSION, nord);
        }*/
        else {
            result = super.reçoitMessageDeLaPresentation(message, piecejointe);
        }

        return result;
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        let result = "";

        if (message == MESSAGE.DIFFUSION) {
            this.pres.reçoitMessage(MESSAGE.DIFFUSION, piecejointe);
        } else {
            result = super.reçoitMessageDeLAbstraction(message, piecejointe);
        }



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