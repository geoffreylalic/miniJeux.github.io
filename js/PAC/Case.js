class Case {
    constructor(ligne, colonne, mine) {
        this.mine = mine;
        this.ligne = ligne;
        this.colonne = colonne;
        this.drapeau = false;

        if (this.drapeau){
            this.imageDrapeau = document.createElement("img");
            this.imageDrapeau.src = "assets/images/drapeau.jpg";
            this.imageDrapeau.width = 88;
            this.imageDrapeau.height = 80;
            this.imageDrapeau.dataset.ligne = this.ligne;
            this.imageDrapeau.dataset.colonne = this.ligne;
        }

        if (this.mine) {
            this.image = document.createElement("img");
            this.image.src = "assets/images/mine.jpg";
            this.image.width = 88;
            this.image.height = 80;
            this.image.dataset.mine = true;
            this.image.dataset.ligne = this.ligne;
            this.image.dataset.colonne = this.ligne;
    
        }else{
            this.image = document.createElement("img");
            this.image.src = "assets/images/caseVide.png";
            this.image.width = 88;
            this.image.height = 80;
            this.image.dataset.ligne = this.ligne;
            this.image.dataset.colonne = this.ligne;
    
        }

    }



    toString() {
        return 'ligne ' + this.ligne + ' colonne ' + this.colonne + ' mine = ' + this.mine +' \n';
    }

}