class Case {
    constructor(ligne, colonne, mine) {
        this.mine = mine;
        this.ligne = ligne;
        this.colonne = colonne;

        if (this.mine) {
            this.image = document.createElement("img");
            this.image.src = "assets/images/mine.jpg";
            this.image.width = 88;
            this.image.height = 80;
            this.image.dataset.ligne = this.ligne;
            this.image.dataset.colonne = this.ligne;
            this.image.dataset.mine = true;
        }

    }



    toString() {
        return 'ligne ' + this.ligne + ' colonne ' + this.colonne + ' mine = ' + this.mine +' \n';
    }

}