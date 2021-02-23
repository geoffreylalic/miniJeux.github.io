class MESSAGE {
    static INIT ="initialisation du jeu";
    static CLICK = "un élément a été clické";
    static CASE_CLICK = "retourne une case clické";
    static CASE_NON_MINE_COORDONNEES="clique sur une case non miné";
    static TABLEAU_CASE = "on envoie le tableau de case";
    static CLICK_DROIT = "évènement clickDroit";
    static DIFFUSION='on diffuse les cases non miné';
    static UNE_CASE = 'une case non miné';
    static TABLEAU_COORDONNEES = 'envoie du tableau et des coordonnées de la case clické';
    static DIFFUSION_INDICES = "diffusion des indices apres la premiere diffision";
}

class Abs {
    setCtrl(ctrl) {
        this.ctrl = ctrl;
    }

    reçoitMessage(message, piecejointe) {
        console.error("reçoitMessage de Abs pas encore implémentée : "+message);
    }
}



class Pres {
    setCtrl(ctrl) {
        this.ctrl = ctrl;

    }

    reçoitMessage(message, piecejointe) {
        console.error("reçoitMessage de Pres pas encore implémentée : "+message);
    }

}


class Ctrl  {
    constructor(abs, pres) {
        this.abs = abs;
        this.abs.setCtrl(this);
        this.pres = pres;
        this.pres.setCtrl(this);

        this.parent = null;
        this.enfants = [];
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        console.error("reçoitMessageDeLAbstraction non impl : "+message);
    }

    reçoitMessageDUnEnfant(message, piecejointe, ctrl) {
        console.error("reçoitMessageDUnEnfant non impl : "+message);
    }

    reçoitMessageDuParent(message, piecejointe) {
        console.error("reçoitMessageDuParent non impl : "+message);
    }

    reçoitMessageDeLaPresentation(message, piecejointe) {
        console.error("reçoitMessageDeLaPresentation non impl : "+message);
    }

    addEnfant(controleur) {
        this.enfants.push(controleur);
        controleur.setParent(this);
    }

    removeEnfant(controleur) {
        this.enfants = this.enfants.filter(pac => pac !== controleur);
    }

    setParent(controleur) {
        this.parent = controleur;
    }

}
