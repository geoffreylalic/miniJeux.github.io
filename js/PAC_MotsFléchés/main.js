window.addEventListener("DOMContentLoaded", () => {
    let absGrille = new AbsGrille();
    let presGrille = new PresGrille();
    let ctrlGrille = new CtrlGrille(absGrille, presGrille);

    let absScore = new AbsScore();
    let presScore = new PresScore();
    let ctrlScore = new CtrlScore(absScore,presScore);
    
    ctrlGrille.addEnfant(ctrlScore);
    ctrlGrille.init();

    
});
