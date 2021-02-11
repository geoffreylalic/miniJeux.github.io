class Case {
    constructor(ligne, colonne) {
        this.mine = true;
        this.ligne = ligne;
        this.colonne = colonne;

        this.image = document.createElement("img");
        this.image.src = "assets/images/mine.jpg";
        this.image.width = 80;
        this.image.height = 80;
        this.image.dataset.ligne = this.ligne;
        this.image.dataset.colonne = this.ligne;
    }

}