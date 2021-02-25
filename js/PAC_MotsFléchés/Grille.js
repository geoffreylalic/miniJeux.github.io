class AbsGrille extends Abs {
    constructor() {
        super();
        this.listeDeMots = [
            "|G|C|G%E|O%",
            "PALACE|CAME",
            "|SARRASIN%S",
            "APITOIEMENT",
            "|INES|RE%E%",
            "BLESSER|SUC",
            "|LUI|RAMENE",
            "PESER%IMPER",
            "%RENAIT%TUF"
        ];

        this.listeIndices = [
            "C'EST GÂCHER ---▶", "BEL HÔTEL",
            "LOGIQUE D'ESPRIT", "DUVETEUSE",
            "OISEAU AU PLUMAGE BIGARRE", "COURSE DE FOND",
            "QUI A PERDU DE SA HAUTEUR",
            "CLUB MARSEILLAIS", "LE BAUDET",
            "LE PREMIER A ËTRE ECLAIRE",
            "DROGUE", "COMPRIMAIT",
            "CEREALE", "COMPASSION",
            "UN PEU BÊTE MAIS PAS MECHANT",
            "PRENOM ESPAGNOL", "FAIRE DE LA PEINE",
            "SOUS/MI", "FIN DE VERBE",
            "NOMBRE DE COTES D'UN HEPTAGONE",
            "IL A DES CORS SUR LA TÊTE",
            "EXTRAIT VEGETAL", "PARTIE DU METRE",
            "C'EST TOUT POUR ELLE", "TARER",
            "FAIT REVENIR AU BERCAIL", "OU RE",
            "IL PROTEGE DE LA PLUIE",
            "RECOMMENCE A VIVRE",
            "MATERIAU DE CONSTRUCTION POREUX",
        ];
        this.solutionLigne = [
            "PALACE","CAME","SARRASIN","APITOIEMENT","INES","RE","BLESSER","SUC","LUI","RAMENE","PESER","IMPER","RENAIT","TUF"
        ];
        this.solutionColonne = [
            "GASPILLER","LAINEUSE","CARTESIEN","CROSS","RA","GEAI","ER","SERRAIT","ECIME","MM","ANE","SEPT","OM","NEUNEU","EST","CERF"
        ];
    }
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.LISTE_MOTS) {
            result = this.listeDeMots;
        } else if (message === MESSAGE.LISTE_INDICES) {
            result = this.listeIndices;
        }
        else {
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
        this.tabCase = create2DArray(this.nbLignes, this.nbColonnes);
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                let div = document.createElement("div");
                this.grille.append(div);
                this.tabCase[ligne][colonne] = div;
            }
        }
    }

    remplirIndices() {
        console.log("remplir");
        let indexIndice = 0;
        let listeMotsAbs = this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.LISTE_MOTS);
        let listeIndices = this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.LISTE_INDICES);
        console.log(listeIndices);
        console.log(listeMotsAbs);
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                let lettre = listeMotsAbs[ligne][colonne];
                if (lettre === '|') {
                    let divHaut = document.createElement("div");
                    divHaut.classList.add("haut");
                    divHaut.innerText = listeIndices[indexIndice];
                    indexIndice +=1;
                    let divBas = document.createElement("div");
                    divBas.innerText = listeIndices[indexIndice];
                    indexIndice +=1;
                    divBas.classList.add("bas");
                    this.tabCase[ligne][colonne].append(divHaut);
                    this.tabCase[ligne][colonne].append(divBas);
                } else if (lettre === '%') {
                    this.tabCase[ligne][colonne].innerText=listeIndices[indexIndice];
                    indexIndice +=1;
                }else {
                    this.tabCase[ligne][colonne].classList.add("caseARemplir");
                    //this.tabCase[ligne][colonne].innerText = lettre;
                }
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
        if (message === MESSAGE.LISTE_MOTS) {
            result = this.abs.reçoitMessage(message);
        } else if (message === MESSAGE.LISTE_INDICES) {
            result = this.abs.reçoitMessage(message);
        }
        else {
            result = super.reçoitMessageDeLaPresentation(message, piecejointe);
        }
        return result;
    }
    init() {
        this.pres.reçoitMessage(MESSAGE.INIT);
    }
}