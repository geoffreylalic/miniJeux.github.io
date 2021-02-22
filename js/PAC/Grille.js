class AbsGrille extends Abs {
    constructor() {
        super();
    }

    /**
     * Pour comparer les messages envoyés dans l'agent PAC
     * @param {*} message classe MESSAGE de PAC.js
     * @param {*} piecejointe objet envoyé à travers le PAC
     */
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message === MESSAGE.TABLEAU_CASE) {
            //on récupère le tableau et la une case dans la piecejointe
            result = this.diffusion(piecejointe[0], piecejointe[1]);
        } else if (message === MESSAGE.DIFFUSION_INDICES) {
            result = this.diffusionIndices(piecejointe[0], piecejointe[1]);
        }
        else {
            //message d'erreur
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

    /**
     * revoie une liste de case qui contient les case ayant des indices
     * @param {*} listeCaseDecouverte 
     * @param {*} tabCasePres 
     */
    diffusionIndices(listeCaseDecouverte, tabCasePres) {
        let result = [];
        listeCaseDecouverte.forEach(caseDecouverte => {
            let ligneCaseCourante = parseInt(caseDecouverte.ligne);
            let colonneCaseCourante = parseInt(caseDecouverte.colonne);
            let caseCourante = tabCasePres[ligneCaseCourante][colonneCaseCourante];

            if (caseCourante.decouvert && !caseCourante.mine && caseCourante.indice === 0) {

                //Case au sud
                if (tabCasePres[ligneCaseCourante + 1] !== undefined && tabCasePres[ligneCaseCourante + 1][colonneCaseCourante].indice > 0 && !tabCasePres[ligneCaseCourante + 1][colonneCaseCourante].decouvert && !tabCasePres[ligneCaseCourante + 1][colonneCaseCourante].mine) {
                    let listSud = tabCasePres[ligneCaseCourante + 1][colonneCaseCourante];
                    result = result.concat(listSud);
                    tabCasePres[ligneCaseCourante + 1][colonneCaseCourante].decouvert = true;
                }

                //Case au nord
                if (tabCasePres[ligneCaseCourante - 1] !== undefined && tabCasePres[ligneCaseCourante - 1][colonneCaseCourante].indice > 0 && !tabCasePres[ligneCaseCourante - 1][colonneCaseCourante].decouvert && !tabCasePres[ligneCaseCourante - 1][colonneCaseCourante].mine) {
                    let listNord = tabCasePres[ligneCaseCourante - 1][colonneCaseCourante];
                    result = result.concat(listNord);
                    tabCasePres[ligneCaseCourante - 1][colonneCaseCourante].decouvert = true;
                }


                //Case au ouest  
                if (tabCasePres[ligneCaseCourante][colonneCaseCourante - 1] !== undefined && tabCasePres[ligneCaseCourante][colonneCaseCourante - 1].indice > 0 && !tabCasePres[ligneCaseCourante][colonneCaseCourante - 1].decouvert && !tabCasePres[ligneCaseCourante][colonneCaseCourante - 1].mine) {
                    let listOuest = tabCasePres[ligneCaseCourante][colonneCaseCourante - 1];
                    result = result.concat(listOuest);
                    tabCasePres[ligneCaseCourante][colonneCaseCourante - 1].decouvert = true;
                }

                //Case au est 
                if (tabCasePres[ligneCaseCourante][colonneCaseCourante + 1] !== undefined && tabCasePres[ligneCaseCourante][colonneCaseCourante + 1].indice > 0 && !tabCasePres[ligneCaseCourante][colonneCaseCourante + 1].decouvert && !tabCasePres[ligneCaseCourante][colonneCaseCourante + 1].mine) {
                    let listEst = tabCasePres[ligneCaseCourante][colonneCaseCourante + 1];
                    result = result.concat(listEst);
                    tabCasePres[ligneCaseCourante][colonneCaseCourante + 1].decouvert = true;
                }


                //Case sud est
                if (tabCasePres[ligneCaseCourante + 1] !== undefined && tabCasePres[ligneCaseCourante][colonneCaseCourante + 1] !== undefined && tabCasePres[ligneCaseCourante + 1][colonneCaseCourante + 1].indice > 0 && !tabCasePres[ligneCaseCourante + 1][colonneCaseCourante + 1].decouvert && !tabCasePres[ligneCaseCourante + 1][colonneCaseCourante + 1].mine) {
                    let listSudEst = tabCasePres[ligneCaseCourante + 1][colonneCaseCourante + 1];
                    result = result.concat(listSudEst);
                    tabCasePres[ligneCaseCourante + 1][colonneCaseCourante + 1].decouvert = true;
                }

                //Case sud ouest
                if (tabCasePres[ligneCaseCourante + 1] !== undefined && tabCasePres[ligneCaseCourante][colonneCaseCourante - 1] !== undefined && tabCasePres[ligneCaseCourante + 1][colonneCaseCourante - 1].indice > 0 && !tabCasePres[ligneCaseCourante + 1][colonneCaseCourante - 1].decouvert && !tabCasePres[ligneCaseCourante + 1][colonneCaseCourante - 1].mine) {
                    let listSudOuest = tabCasePres[ligneCaseCourante + 1][colonneCaseCourante - 1];
                    result = result.concat(listSudOuest);
                    tabCasePres[ligneCaseCourante + 1][colonneCaseCourante - 1].decouvert = true;

                }

                //Case nord est
                if (tabCasePres[ligneCaseCourante - 1] !== undefined && tabCasePres[ligneCaseCourante][colonneCaseCourante + 1] !== undefined && tabCasePres[ligneCaseCourante - 1][colonneCaseCourante + 1].indice > 0 && !tabCasePres[ligneCaseCourante - 1][colonneCaseCourante + 1].decouvert && !tabCasePres[ligneCaseCourante - 1][colonneCaseCourante + 1].mine) {
                    let listNordEst = tabCasePres[ligneCaseCourante - 1][colonneCaseCourante + 1];
                    result = result.concat(listNordEst);
                    tabCasePres[ligneCaseCourante - 1][colonneCaseCourante + 1].decouvert = true;
                }

                //Case nord ouest
                if (tabCasePres[ligneCaseCourante - 1] !== undefined && tabCasePres[ligneCaseCourante][colonneCaseCourante - 1] !== undefined && tabCasePres[ligneCaseCourante - 1][colonneCaseCourante - 1].indice > 0 && !tabCasePres[ligneCaseCourante - 1][colonneCaseCourante - 1].decouvert && !tabCasePres[ligneCaseCourante - 1][colonneCaseCourante - 1].mine) {
                    let listNordOuest = tabCasePres[ligneCaseCourante - 1][colonneCaseCourante - 1];
                    result = result.concat(listNordOuest);
                    tabCasePres[ligneCaseCourante - 1][colonneCaseCourante - 1].decouvert = true;
                }

            }


        });
        return result;

    }

    /**
     * Permet de faire la diffusion entre les case non minés dans le jeu et de les découvrir
     * @param {*} tableauCase 
     * @param {*} caseCourante 
     */
    diffusion(tableauCase, caseCourante) {
        let result = [];
        //result.splice(0, result.length);
        let tabCasePres = tableauCase;

        //on convertie en int les coordonnées
        let ligneCaseCourante = parseInt(caseCourante.ligne);
        let colonneCaseCourante = parseInt(caseCourante.colonne);


        if (!caseCourante.decouvert && !caseCourante.mine && caseCourante.indice === 0) {
            result.push(caseCourante);
            caseCourante.decouvert = true;

            //Case au sud
            if (tabCasePres[ligneCaseCourante + 1] !== undefined && tabCasePres[ligneCaseCourante + 1][colonneCaseCourante].indice === 0) {
                let listSud = this.diffusion(tabCasePres, tabCasePres[ligneCaseCourante + 1][colonneCaseCourante]);
                result = result.concat(listSud);
                tabCasePres[ligneCaseCourante + 1][colonneCaseCourante].decouvert = true;
            }

            //Case au nord
            if (tabCasePres[ligneCaseCourante - 1] !== undefined && tabCasePres[ligneCaseCourante - 1][colonneCaseCourante].indice === 0) {
                let listNord = this.diffusion(tabCasePres, tabCasePres[ligneCaseCourante - 1][colonneCaseCourante]);
                result = result.concat(listNord);
                tabCasePres[ligneCaseCourante - 1][colonneCaseCourante].decouvert = true;
            }


            //Case au ouest  
            if (tabCasePres[ligneCaseCourante][colonneCaseCourante - 1] !== undefined && tabCasePres[ligneCaseCourante][colonneCaseCourante - 1].indice === 0) {
                let listOuest = this.diffusion(tabCasePres, tabCasePres[ligneCaseCourante][colonneCaseCourante - 1]);
                result = result.concat(listOuest);
                tabCasePres[ligneCaseCourante][colonneCaseCourante - 1].decouvert = true;
            }

            //Case au est 
            if (tabCasePres[ligneCaseCourante][colonneCaseCourante + 1] !== undefined && tabCasePres[ligneCaseCourante][colonneCaseCourante + 1].indice === 0) {
                let listEst = this.diffusion(tabCasePres, tabCasePres[ligneCaseCourante][colonneCaseCourante + 1]);
                result = result.concat(listEst);
                tabCasePres[ligneCaseCourante][colonneCaseCourante + 1].decouvert = true;
            }

        } else if (!caseCourante.decouvert && !caseCourante.mine && caseCourante.indice > 0) {
            let caseARetourner = [caseCourante];
            result = result.concat(caseARetourner);
            caseCourante.decouvert = true;
        }

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
        //pour dessiner la grille grâce au css
        this.grille = document.createElement("div");
        this.grille.id = 'grille';
        document.body.append(this.grille);

        //écouteur sur la grille
        //let grilleListenner = document.querySelector('#grille')
    }

    /**
     * Pour comparer les messages envoyés dans l'agent PAC
     * @param {*} message classe MESSAGE de PAC.js
     * @param {*} piecejointe objet envoyé à travers le PAC
     */
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.INIT) {
            this.construireGrille();
            this.remplirTableau();
            this.ajouterIndices();
        } else if (message == MESSAGE.CLICK) {
            this.clickSurCase(piecejointe);
        } else if (message == MESSAGE.DIFFUSION) {
            this.rechercheDansGrille(piecejointe);
        } else if (message == MESSAGE.CLICK_DROIT) {
            this.ajoutDrapeau(piecejointe);
        } else if (message == MESSAGE.UNE_CASE) {
        } else {
            //message d'erreur
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

    /**
     * Permet d'ajouter des indices sur les cases autour d'une mine
     */
    ajouterIndices() {
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                if (this.tabCase[ligne][colonne].mine) {
                    this.tabMine.push(this.tabCase[ligne][colonne]);
                }
            }
        }

        this.tabMine.forEach(caseMine => {
            let ligne = parseInt(caseMine.ligne);
            let colonne = parseInt(caseMine.colonne);

            console.log("ligne : " + ligne + ' colonne : ' + colonne);
            //Case sud
            if (this.tabCase[ligne + 1] !== undefined && !this.tabCase[ligne + 1][colonne].mine) {
                this.tabCase[ligne + 1][colonne].indice += 1;
            }

            //Case au nord
            if (this.tabCase[ligne - 1] !== undefined && !this.tabCase[ligne - 1][colonne].mine) {
                this.tabCase[ligne - 1][colonne].indice += 1;
            }

            //Case au ouest  
            if (this.tabCase[ligne][colonne - 1] !== undefined && !this.tabCase[ligne][colonne - 1].mine) {
                this.tabCase[ligne][colonne - 1].indice += 1;
            }

            //Case au est 
            if (this.tabCase[ligne][colonne + 1] !== undefined && !this.tabCase[ligne][colonne + 1].mine) {
                this.tabCase[ligne][colonne + 1].indice += 1;
            }

            //Case sud est
            if (this.tabCase[ligne + 1] !== undefined && this.tabCase[ligne][colonne + 1] !== undefined && !this.tabCase[ligne + 1][colonne + 1].mine) {
                this.tabCase[ligne + 1][colonne + 1].indice += 1;
            }

            //Case sud ouest
            if (this.tabCase[ligne + 1] !== undefined && this.tabCase[ligne][colonne - 1] !== undefined && !this.tabCase[ligne + 1][colonne - 1].mine) {
                this.tabCase[ligne + 1][colonne - 1].indice += 1;
            }

            //Case nord est
            if (this.tabCase[ligne - 1] !== undefined && this.tabCase[ligne][colonne + 1] !== undefined && !this.tabCase[ligne - 1][colonne + 1].mine) {
                this.tabCase[ligne - 1][colonne + 1].indice += 1;
            }

            //Case nord ouest
            if (this.tabCase[ligne - 1] !== undefined && this.tabCase[ligne][colonne - 1] !== undefined && !this.tabCase[ligne - 1][colonne - 1].mine) {
                this.tabCase[ligne - 1][colonne - 1].indice += 1;
            }

        });


    }

    /**
     * Permet d'ajouter un drapeau grace au click droit
     * @param {} piecejointe 
     */
    ajoutDrapeau(piecejointe) {
        let clickDroit = piecejointe;
        if (!clickDroit.dataset.ligne) {
            clickDroit = clickDroit.parentNode;
        }
        let ligneCase = clickDroit.dataset.ligne;
        let colonneCase = clickDroit.dataset.colonne;
        this.tabCase[ligneCase][colonneCase].showDrapeau();
    }

    /**
     * Permet de rechercher un indice dans la grille grace au coordonnés d'une case(ligne/colonne)
     * @param {*} piecejointe une case
     */
    rechercheDansGrille(piecejointe) {
        let ligneCase = parseInt(piecejointe.ligne);
        let colonneCase = parseInt(piecejointe.colonne);
        let indiceDansGrille = (this.nbLignes * ligneCase) + colonneCase;
        let grille = document.querySelectorAll("#grille div");
        grille.item(indiceDansGrille).append(piecejointe.image);
    }

    /**
     * Permet de dessiner la contenu d'une case en fonction de son parametre de Case.mine
     * @param {*} piecejointe 
     */
    clickSurCase(piecejointe) {
        let divClick = piecejointe;
        let ligne = divClick.dataset.ligne;
        let colonne = divClick.dataset.colonne;
        let toutesLesDivs = document.querySelectorAll("#grille div");
        let largeur = Math.floor(Math.sqrt(toutesLesDivs.length));
        if (this.tabCase[ligne][colonne].mine) {
            toutesLesDivs.forEach(div => {
                if (this.tabCase[div.dataset.ligne][div.dataset.colonne].mine) {
                    div.append((this.tabCase[div.dataset.ligne][div.dataset.colonne].image));
                }
            })
        }
        else if (!this.tabCase[ligne][colonne].mine) {
            //on envoie la case avec son tableau à l'abstraction
            let listAMontrer = this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.TABLEAU_CASE, [this.tabCase, this.tabCase[ligne][colonne]]);
            listAMontrer.forEach(casee => {
                let ligne = parseInt(casee.ligne);
                let colonne = parseInt(casee.colonne)
                this.caseNonMine(toutesLesDivs.item(ligne * largeur + colonne));
            });

            let indicesAMontrer = this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.DIFFUSION_INDICES, [listAMontrer, this.tabCase]);
            indicesAMontrer.forEach(caseIndice => {
                let ligne = parseInt(caseIndice.ligne);
                let colonne = parseInt(caseIndice.colonne)
                this.caseNonMine(toutesLesDivs.item(ligne * largeur + colonne));
            });
        }
    }

    /**
     * Pour changer la couleur d'une case qui n'est pas miné une clické
     * @param {*} div 
     */
    caseNonMine(div) {
        let ligne = parseInt(div.dataset.ligne);
        let colonne = parseInt(div.dataset.colonne);
        let image = document.createElement("img");
        if (this.tabCase[ligne][colonne].decouvert) {
            switch (this.tabCase[ligne][colonne].indice) {
                case 0:
                    div.append(this.tabCase[div.dataset.ligne][div.dataset.colonne].image)
                    break;
                case 1:
                    image.src = "assets/images/1.png";
                    image.width = 88;
                    image.height = 80;
                    div.append(image);
                    break;
                case 2:
                    image.src = "assets/images/2.png";
                    image.width = 88;
                    image.height = 80;
                    div.append(image);
                    break;
                case 3:
                    image.src = "assets/images/3.png";
                    image.width = 88;
                    image.height = 80;
                    div.append(image);
                    break;
                case 4:
                    image.src = "assets/images/4.png";
                    image.width = 88;
                    image.height = 80;
                    div.append(image);
                    break;
                case 5:
                    image.src = "assets/images/5.png";
                    image.width = 88;
                    image.height = 80;
                    div.append(image);
                    break;
                case 6:
                    image.src = "assets/images/6.png";
                    image.width = 88;
                    image.height = 80;
                    div.append(image);
                    break;
                case 7:
                    image.src = "assets/images/7.png";
                    image.width = 88;
                    image.height = 80;
                    div.append(image);
                    break;
                case 8:
                    image.src = "assets/images/8.png";
                    image.width = 88;
                    image.height = 80;
                    div.append(image);
                    break;
            }
        }


    }

    /**
     * Permet de construire la grille
     */
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

    /**
     * Permet de remplir la grille de case contenant des mines ou non
     */
    remplirTableau() {
        this.tabCase = create2DArray(this.nbLignes);
        let toutesLesDivs = document.querySelectorAll("#grille div");
        let indexCase;
        let ligne;
        let colonne;

        for (let caseCourante = 0; caseCourante < this.nbMines; caseCourante++) {
            indexCase = Math.floor(Math.random() * toutesLesDivs.length);
            toutesLesDivs.forEach((div, index) => {
                ligne = div.dataset.ligne;
                colonne = div.dataset.colonne;
                if (index === indexCase) {
                    if (this.tabCase[ligne][colonne] === undefined) {
                        this.tabCase[ligne][colonne] = new Case(ligne, colonne, true, div);

                    }
                    else if (typeof (this.tabCase[ligne][colonne]) === 'object') {
                        indexCase = Math.floor(Math.random() * toutesLesDivs.length)
                        index = indexCase;
                        if (this.tabCase[ligne][colonne] === undefined) {
                            this.tabCase[ligne][colonne] = new Case(ligne, colonne, true, div);
                        }
                    }
                }
            });
        }
        // on crée les case non miné
        toutesLesDivs.forEach(div => {
            ligne = parseInt(div.dataset.ligne);
            colonne = parseInt(div.dataset.colonne);
            if (this.tabCase[ligne][colonne] === undefined) {
                this.tabCase[ligne][colonne] = new Case(ligne, colonne, false, div);
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
        if (message === MESSAGE.CASE_CLICK) {
            result = this.abs.reçoitMessage(MESSAGE.CASE_CLICK, piecejointe);
        }
        else if (message === MESSAGE.TABLEAU_CASE) {
            result = this.abs.reçoitMessage(MESSAGE.TABLEAU_CASE, piecejointe);
        } else if (message === MESSAGE.DIFFUSION_INDICES) {
            result = this.abs.reçoitMessage(message, piecejointe);
        }
        else {
            result = super.reçoitMessageDeLaPresentation(message, piecejointe);
        }

        return result;
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        let result = "";

        if (message == MESSAGE.DIFFUSION) {
            this.pres.reçoitMessage(message, piecejointe);
        } else if (message == MESSAGE.UNE_CASE) {
            this.pres.reçoitMessage(message.piecejointe);
        }
        else {
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

        this.pres.grille.addEventListener("contextmenu", (evt) => {
            evt.preventDefault();
            let clickDroit = evt.target;
            console.log("j'ai fait un click droit");
            this.pres.reçoitMessage(MESSAGE.CLICK_DROIT, clickDroit);

        })

    }


}