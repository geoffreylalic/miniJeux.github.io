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
                } else {
                    this.grilleUser[ligne][colonne] = ".";
                }
            }
        }

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
            this.ajoutLettre(piecejointe);
            this.verificationLigne();
            this.verificationColonne();
            this.finDePartie();
        } else if (message === MESSAGE.CLICK_TRICHE) {
            this.ctrl.reçoitMessageDeLAbstraction(message, this.listeDeMots);
            this.finTriche();
        } else if (message === MESSAGE.CLICK_REJOUER) {
            this.ctrl.reçoitMessageDeLAbstraction(message, this.listeDeMots);
        } else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

    finTriche() {
        alert("Fin de partie, vous avez triché");
    }

    finDePartie() {
        let fin = 0;
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            let mot = this.grilleUser[ligne].join();
            mot = mot.replaceAll(",", "");
            this.listeDeMots.forEach(motSolution => {
                if (motSolution === mot) {
                    fin++;
                }
            });
        }
        if (fin === this.nbLignes) {
            alert("Gagné!!");
        }
    }

    ajoutLettre(piecejointe) {
        //on place la lettre ajouter dasn this.grilleUSer
        let ligne = piecejointe[0];
        let colonne = piecejointe[1];
        let lettre = piecejointe[2];
        this.grilleUser[ligne][colonne] = lettre;
    }

    verificationLigne() {
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let indice = 0; indice < this.solutionLigne.length; indice++) {
                let mot = this.grilleUser[ligne].join();
                mot = mot.replaceAll(",", "");
                //pour contrer les doublons de réponses justes
                if (mot.includes(this.solutionLigne[indice]) && this.listeDeMots[ligne].includes(this.solutionLigne[indice]) && mot.indexOf(this.solutionLigne[indice]) === this.listeDeMots[ligne].indexOf(this.solutionLigne[indice])) {
                    //indice de la premiere lettre
                    let posPremier = mot.indexOf(this.solutionLigne[indice]);
                    let posDernier = posPremier + this.solutionLigne[indice].length;
                    if ((this.listeDeMots[ligne][posPremier - 1] === undefined || this.listeDeMots[ligne][posPremier - 1] === "|" || this.listeDeMots[ligne][posPremier - 1] === "%") && (this.listeDeMots[ligne][posDernier] === undefined || this.listeDeMots[ligne][posDernier] === "|" || this.listeDeMots[ligne][posDernier] === "%")) {
                        //envoyé a la présentation les lettre marqué;
                        for (let position = posPremier; position < posDernier; position++) {
                            this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.LETTRE_JUSTE, [ligne, position]);
                        }
                        //this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.MOT_TROUVE);
                    }

                }
            }
        }
    }

    verificationColonne() {
        //on tourne le tableau (colonnes deviennent des ligne et vice-versa)
        let grilleInverse = create2DArray(11, 9);
        for (let ligne = 0; ligne < this.nbColonnes; ligne++) {
            for (let colonne = 0; colonne < this.nbLignes; colonne++) {
                grilleInverse[ligne][colonne] = this.grilleUser[colonne][ligne];
            }
        }

        let listeDeMotsInverse = create2DArray(11, 9);
        for (let ligne = 0; ligne < this.nbColonnes; ligne++) {
            for (let colonne = 0; colonne < this.nbLignes; colonne++) {
                listeDeMotsInverse[ligne][colonne] = this.listeDeMots[colonne][ligne];
            }
        }

        for (let ligne = 0; ligne < this.nbColonnes; ligne++) {
            for (let indice = 0; indice < this.solutionColonne.length; indice++) {
                let mot = grilleInverse[ligne].join();
                mot = mot.replaceAll(",", "");
                let solutionInverse = listeDeMotsInverse[ligne].join();
                solutionInverse = solutionInverse.replaceAll(",", "");
                if (mot.includes(this.solutionColonne[indice]) && solutionInverse.includes(this.solutionColonne[indice]) && mot.indexOf(this.solutionColonne[indice]) === solutionInverse.indexOf(this.solutionColonne[indice])) {
                    //indice de la premiere lettre
                    let posPremier = mot.indexOf(this.solutionColonne[indice]);
                    let posDernier = posPremier + this.solutionColonne[indice].length;
                    // on vérifie si avant la premeiere la dernière lettre il y a un indice
                    if ((solutionInverse[posPremier - 1] === undefined || solutionInverse[posPremier - 1] === "|" || solutionInverse[posPremier - 1] === "%") && (solutionInverse[posDernier] === undefined || solutionInverse[posDernier] === "|" || solutionInverse[posDernier] === "%")) {
                        //envoyé a la présentation les lettre marqué;
                        for (let position = posPremier; position < posDernier; position++) {
                            this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.LETTRE_JUSTE, [position, ligne]);
                        }
                        this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.MOT_TROUVE);
                    }
                }
            }
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
        } else if (message === MESSAGE.LETTRE_JUSTE) {
            this.marqueLettre(piecejointe);
        } else if (message === MESSAGE.CLICK_TRICHE) {
            this.triche(piecejointe);
        } else if (message === MESSAGE.CLICK_REJOUER) {
            this.rejouer(piecejointe);
        } else {
            result = super.reçoitMessage(message, piecejointe);
        }

        return result;
    }

    rejouer(listeSolution) {
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                if (listeSolution[ligne][colonne] !== "|" && listeSolution[ligne][colonne] !== "%" && (!this.tabCase[ligne][colonne].classList.contains("marqueLettre") || !this.tabCase[ligne][colonne].classList.contains("triche"))) {
                    this.tabCase[ligne][colonne].innerText = "";
                    // on enleve toutes les classes css aux mots trouvé
                    this.tabCase[ligne][colonne].classList.remove("marqueLettre");
                    this.tabCase[ligne][colonne].classList.remove("triche");
                }

            }
        }
    }

    triche(listeSolution) {
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                if (listeSolution[ligne][colonne] !== "|" && listeSolution[ligne][colonne] !== "%" && !this.tabCase[ligne][colonne].classList.contains("marqueLettre")) {
                    this.tabCase[ligne][colonne].innerText = listeSolution[ligne][colonne];
                    //ajouter une classe css
                    this.tabCase[ligne][colonne].classList.add("triche");
                }

            }
        }
    }

    marqueLettre(piecejointe) {
        let ligne = piecejointe[0];
        let colonne = piecejointe[1];
        this.tabCase[ligne][colonne].classList.add("marqueLettre");
        //pour enlever la derniere case clické en cas de mot trouvé;
        this.tabCaseClick.pop();
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
                        } else {
                            this.tabCaseClick.push(this.tabCase[ligne][colonne]);
                            this.tabCaseClick[0].classList.add("caseSelectionne");
                        }
                    });
                }
            }
        }
        //listener sur clavier
        window.addEventListener("keypress", (evt) => {
            let lettreTape = evt.key.toUpperCase();
            if (this.tabCaseClick.length > 0) {
                this.tabCaseClick[0].innerText = lettreTape;
                let ligne = parseInt(this.tabCaseClick[0].dataset.ligne);
                let colonne = parseInt(this.tabCaseClick[0].dataset.colonne);
                this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.LETTRE, [ligne, colonne, lettreTape]);
            }

        });
    }

}




class CtrlGrille extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    reçoitMessageDUnEnfant(message, piecejointe, ctrl) {
        let result = "";

        // l'utilisateur souhaite tricher
        if (message === MESSAGE.CLICK_TRICHE) {
            this.abs.reçoitMessage(message);
        } else if (message === MESSAGE.CLICK_REJOUER) {
            this.abs.reçoitMessage(message);
        } else {
            result = super.reçoitMessageDunEnfnant(message, piecejointe, ctrl)
        }
        return result;
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.LETTRE_JUSTE) {
            this.pres.reçoitMessage(message, piecejointe);
        }
        /*else if(message === MESSAGE.MOT_TROUVE){
                   this.enfants.forEach(enfant =>{
                       enfant.reçoitMessageDunParent(message);
                   });
               }*/
        else if (message === MESSAGE.CLICK_TRICHE) {
            this.pres.reçoitMessage(message, piecejointe);
        } else if (message === MESSAGE.CLICK_REJOUER) {
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
        } else {
            result = super.reçoitMessageDeLaPresentation(message, piecejointe);
        }
        return result;
    }
    init() {
        this.pres.reçoitMessage(MESSAGE.INIT);
        this.enfants.forEach(enfant => {
            enfant.reçoitMessageDuParent(MESSAGE.INIT);
        });
    }
}