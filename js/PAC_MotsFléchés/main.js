window.addEventListener("DOMContentLoaded", () => {
    let absGrille = new AbsGrille();
    let presGrille = new PresGrille();
    let ctrlGrille = new CtrlGrille(absGrille, presGrille);
    
    ctrlGrille.init();
});

