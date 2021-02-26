class AbsGrille extends Abs {
    constructor() {
        super();

        this.nbLignes = 9;
        this.nbColonnes = 11;

        //les solutions
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

        //grille que remplie l'utilisateur
        this.grilleUser = create2DArray(this.nbLignes, this.nbColonnes);
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                let lettre = this.listeDeMots[ligne][colonne];
                if (lettre === "|" || lettre === "%") {
                    this.grilleUser[ligne][colonne] = lettre;
                }
            }
        }
        console.log(this.grilleUser);

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
            "PALACE", "CAME", "SARRASIN", "APITOIEMENT", "INES", "RE", "BLESSER", "SUC", "LUI", "RAMENE", "PESER", "IMPER", "RENAIT", "TUF"
        ];
        this.solutionColonne = [
            "GASPILLER", "LAINEUSE", "CARTESIEN", "CROSS", "RA", "GEAI", "ER", "SERRAIT", "ECIME", "MM", "ANE", "SEPT", "OM", "NEUNEU", "EST", "CERF"
        ];
    }
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.LISTE_MOTS) {
            result = this.listeDeMots;
        } else if (message === MESSAGE.LISTE_INDICES) {
            result = this.listeIndices;
        } else if (message === MESSAGE.LETTRE) {
            this.verification(piecejointe);
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

    verification(piecejointe) {
        //on place la lettre ajouter dasn this.grilleUSer
        let ligne = piecejointe[0];
        let colonne = piecejointe[1];
        let lettre = piecejointe[2];
        console.log(typeof (ligne));
        this.grilleUser[ligne][colonne] = lettre;
        if (this.grilleUser[ligne][colonne] === this.listeDeMots[ligne][colonne]) {
            this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.LETTRE_JUSTE, [ligne, colonne]);
        }
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

        this.tabCaseClick = [];

    }

    reçoitMessage(message, piecejointe) {
        let result;
        if (message === MESSAGE.INIT) {
            this.dessineGrille();
            this.remplirIndices();
        } else if (MESSAGE.LETTRE_JUSTE, piecejointe) {
            this.marqueLettre(piecejointe);
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }

        return result;
    }

    marqueLettre(piecejointe) {
        let ligne = piecejointe[0];
        let colonne = piecejointe[1];
        this.tabCase[ligne][colonne].classList.add("marqueLettre");
    }

    dessineGrille() {
        this.tabCase = create2DArray(this.nbLignes, this.nbColonnes);
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                let div = document.createElement("div");
                this.grille.append(div);
                this.tabCase[ligne][colonne] = div;
                this.tabCase[ligne][colonne].dataset.ligne = ligne;
                this.tabCase[ligne][colonne].dataset.colonne = colonne;
            }
        }
    }

    remplirIndices() {
        let indexIndice = 0;
        let listeMotsAbs = this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.LISTE_MOTS);
        let listeIndices = this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.LISTE_INDICES);
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                let lettre = listeMotsAbs[ligne][colonne];
                //afficher deux indices sur une case
                if (lettre === '|') {
                    let divHaut = document.createElement("div");
                    divHaut.classList.add("haut");
                    divHaut.innerText = listeIndices[indexIndice];
                    indexIndice += 1;
                    let divBas = document.createElement("div");
                    divBas.innerText = listeIndices[indexIndice];
                    indexIndice += 1;
                    divBas.classList.add("bas");
                    this.tabCase[ligne][colonne].append(divHaut);
                    this.tabCase[ligne][colonne].append(divBas);
                    //afficher un indice sur une case
                } else if (lettre === '%') {
                    this.tabCase[ligne][colonne].innerText = listeIndices[indexIndice];
                    this.tabCase[ligne][colonne].classList.add("divIndice");
                    indexIndice += 1;
                } else {
                    this.tabCase[ligne][colonne].classList.add("caseARemplir");
                    this.tabCase[ligne][colonne].addEventListener("click", () => {
                        if (this.tabCaseClick.length > 0) {
                            this.tabCaseClick[0].classList.remove("caseSelectionne");
                            this.tabCaseClick.pop();
                            this.tabCaseClick.push(this.tabCase[ligne][colonne]);
                            this.tabCaseClick[0].classList.add("caseSelectionne");
                            //listener sur clavier
                            window.addEventListener("keypress", (evt) => {
                                let lettreTape = evt.key.toUpperCase();
                                this.tabCaseClick[0].innerText = lettreTape;
                                this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.LETTRE, [ligne, colonne, lettreTape]);
                            });
                            console.log("dans remplir if");
                        } else {
                            this.tabCaseClick.push(this.tabCase[ligne][colonne]);
                            this.tabCaseClick[0].classList.add("caseSelectionne");
                            window.addEventListener("keypress", (evt) => {
                                let lettreTape = evt.key.toUpperCase();
                                this.tabCaseClick[0].innerText = lettreTape;
                                this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.LETTRE, [ligne, colonne, lettreTape]);
                            });
                        }
                    });
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
        if (message === MESSAGE.LETTRE_JUSTE) {
            this.pres.reçoitMessage(message, piecejointe);
        } else {
            result = super.reçoitMessageDeLAbstraction(message, piecejointe);
        }
        return result;

    }
    reçoitMessageDeLaPresentation(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.LISTE_MOTS) {
            result = this.abs.reçoitMessage(message);
        } else if (message === MESSAGE.LISTE_INDICES) {
            result = this.abs.reçoitMessage(message);
        } else if (message === MESSAGE.LETTRE) {
            this.abs.reçoitMessage(message, piecejointe);
            console.log("dans le controleurs");
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