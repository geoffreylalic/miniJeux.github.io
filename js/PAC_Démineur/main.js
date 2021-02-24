window.addEventListener("DOMContentLoaded", () => {
    loadAssets(startGame);
});

function startGame(assets){
    let absGrille = new AbsGrille();
    let presGrille = new PresGrille();
    let ctrlGrille = new CtrlGrille(absGrille, presGrille);
    
    ctrlGrille.init();
}