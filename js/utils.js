/** En JavaScript on ne peut pas déclarer directement de tableau à n dimensions
   en précisant toutes les dimensions. tab [4][4] n'est pas possible par exemple.
   On déclare en général un tableau à une dimension de taille varialbe (ci-dessous 
   let arr = []) puis ensuite pour chacune des lignes du tableau, on lui affecte un autre
   tableau (arr[i] = [] ci-dessous) */

function create2DArray(rows, columns) {
    let arr = [];

    for (let l = 0; l < rows; l++) {
        for (let c = 0; c < columns; c++) {
            arr[l] = [];
        }
    }
    return arr;
}

function selectionNiveau(lvl){
    niveau = lvl;
}

