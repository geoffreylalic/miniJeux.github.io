class AbsGrille extends Abs {
    constructor() {
        super();
        this.listeDeMots = ["|G|C|G|E|O|",
                            "PALACE|CAME",
                            "|SARRASIN|S",
                            "APITOIEMENT",
                            "|INES|RE|E|",
                            "BLESSER|SUC",
                            "|LUI|RAMENE",
                            "PESER|IMPER",
                            "|RENAIT|TUF"];
    }
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.LISTE_MOTS){
            result = this.listeDeMots;
        }else{
            result = super.reçoitMessage(message, piecejointe);
        }
        
        return result;
    }
}

class PresGrille extends Pres {
    constructor() {
        super();
        this.nbLignes = 9;
        this.nbColonnes = 11;
        this.tabCase;

        this.grille = document.createElement("div");
        this.grille.id = 'grilleMF';
        document.body.append(this.grille);
    }

    reçoitMessage(message, piecejointe) {
        let result;
        if (message === MESSAGE.INIT) {
            this.dessineGrille();
            this.remplirIndices();
        } else {
            result = super.reçoitMessage(message, piecejointe);
        }

        return result;
    }

    dessineGrille() {
        console.log("dessineGrille");
        this.tabCase = create2DArray(this.nbLignes,this.nbColonnes);
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                let div = document.createElement("div");
                this.grille.append(div);
                this.tabCase[ligne][colonne] = div;
            }
        }
    }

    remplirIndices(){
        console.log("remplir");
        let listeMotsAbs = this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.LISTE_MOTS);
        console.log(listeMotsAbs);
        for (let ligne = 0; ligne<this.nbLignes;ligne++){
            for(let colonne = 0; colonne<this.nbColonnes;colonne ++){
                let lettre = listeMotsAbs[ligne][colonne];
                this.tabCase[ligne][colonne].innerText = lettre;
            }
        }
    }

}

class CtrlGrille extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        let result = "";
        return result;

    }
    reçoitMessageDeLaPresentation(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.LISTE_MOTS){
            result = this.abs.reçoitMessage(message);
        }
        return result;
    }
    init() {
        this.pres.reçoitMessage(MESSAGE.INIT);
    }
}