class Case {
    constructor(ligne, colonne, mine, div) {
        this.mine = mine;
        this.ligne = ligne;
        this.colonne = colonne;
        this.drapeau = false;
        this.indice = 0;
        this.decouvert = false;
        this.div = div;
        
        if (this.mine) {
            this.image = document.createElement("img");
            this.image.src = "assets/images/demineur/mine.jpg";
            this.image.width = 88;
            this.image.height = 80;
            this.image.dataset.mine = true;
            this.image.dataset.ligne = this.ligne;
            this.image.dataset.colonne = this.ligne;

        } if (!this.mine) {
            this.image = document.createElement("img");
            this.image.src = "assets/images/demineur/caseVide.png";
            this.image.width = 88;
            this.image.height = 80;
            this.image.dataset.ligne = this.ligne;
            this.image.dataset.colonne = this.ligne;

        }


    }

    showDrapeau() {
        if (this.image.src.endsWith("drapeau.jpg")) {
            this.image.parentNode.removeChild(this.image);
            this.image.src = null;
        }
        else {
            this.image = document.createElement('img');
            this.image.src = "assets/images/demineur/drapeau.jpg";
            this.image.width = 88;
            this.image.height = 80;
            this.div.appendChild(this.image);
        }
    }



    toString() {
        return 'ligne ' + this.ligne + ' colonne ' + this.colonne + ' mine = ' + this.mine + ' indice ' + this.indice + ' \n';
    }

}