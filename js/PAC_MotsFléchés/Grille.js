class AbsGrille extends Abs{
    constructor() {
        super();
    }
    reçoitMessage(message,piecejointe){
       let result = "";
       result = super.reçoitMessage(message,piecejointe);
       return result; 
    }
}

class PresGrille extends Pres{
    constructor() {
        super();
        //pour dessiner la grille grâce au css
        this.grille = document.createElement("div");
        this.grille.id = 'grille';
        document.body.append(this.grille);
    }
    
    reçoitMessage(message,piecejointe){
        let result = "";
        result = super.reçoitMessage(message,piecejointe);
        return result; 
     }

}

class CtrlGrille extends Ctrl{
    constructor(abs, pres) {
        super(abs, pres);
    }
    
    reçoitMessageDeLAbstraction(message,piecejointe){
        let result= "";
        return result;

    }
    reçoitMessageDeLaPresentation(message,piecejointe){
        let result= "";
        return result;
    }
}