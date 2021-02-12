class AbsGrille extends Abs {
    constructor() {
        super();
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.CLICK) {
            console.log("dans abs reçoitmessage");
            verificationMine(piecejointe);
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

    verificationMine(piecejointe){
        let ligne = parseInt(piecejointe.dataset.ligne);
        let colonne = parseInt(piecejointe.dataset.colonne);
        if (this.tabCase[ligne][colonne].mine) {
            console.log(piecejointe.mine === true);
            let h1 = document.querySelector("h1");
            h1.innerHTML += 'perdu';
        }
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

        //écouteur sur la grille
        //let grilleListenner = document.querySelector('#grille')

    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.INIT) {
            this.construireGrille();
            this.remplirTableau();

        }

        //message non implémenté
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
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
                    div.append(this.tabCase[ligne][colonne].image);
                    break;
                case 2:
                    this.tabCase[ligne][colonne] = new Case(ligne, colonne, false);
                    break;
            }

        })
    }

}


class CtrlGrille extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        let result = "";

        result = super.reçoitMessageDeLAbstraction(message, piecejointe);

    }

    init() {
        console.log("fct init");
        this.pres.reçoitMessage(MESSAGE.INIT);
        //abonnement de la fonction à l'écouteur
        this.pres.grille.addEventListener("click", (evt)=> {
            let clickCible = evt.target;
            console.log(clickCible);
            this.abs.reçoitMessage(MESSAGE.CLICK, clickCible);
        });
    }


}