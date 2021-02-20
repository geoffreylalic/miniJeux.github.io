class Case {
    constructor(ligne, colonne, mine,div) {
        this.mine = mine;
        this.ligne = ligne;
        this.colonne = colonne;
        this.drapeau = false;
        this.indice = 0;
        this.decouvert = false;
        this.div=div;

        if (this.drapeau){
            this.imageDrapeau = document.createElement("img");
            this.imageDrapeau.src = "assets/images/drapeau.jpg";
            this.imageDrapeau.width = 88;
            this.imageDrapeau.height = 80;
            this.imageDrapeau.dataset.ligne = this.ligne;
            this.imageDrapeau.dataset.colonne = this.ligne;
        }if (this.mine) {
            this.image = document.createElement("img");
            this.image.src = "assets/images/mine.jpg";
            this.image.width = 88;
            this.image.height = 80;
            this.image.dataset.mine = true;
            this.image.dataset.ligne = this.ligne;
            this.image.dataset.colonne = this.ligne;
    
        }if(!this.mine){
            this.image = document.createElement("img");
            this.image.src = "assets/images/caseVide.png";
            this.image.width = 88;
            this.image.height = 80;
            this.image.dataset.ligne = this.ligne;
            this.image.dataset.colonne = this.ligne;
    
        }
        

    }
    showDrapeau(){
        if(this.image.src.endsWith("drapeau.jpg")){
            this.image.parentNode.removeChild(this.image);    
            }
            else{
               this.image=document.createElement('img');
               this.image.src= "assets/images/drapeau.jpg";
               this.image.width=80;
               this.image.height=80;
                this.div.appendChild(this.image);
            }
        }



    toString() {
        return 'ligne ' + this.ligne + ' colonne ' + this.colonne + ' mine = ' + this.mine + ' indice '+ this.indice+' \n';
    }

}