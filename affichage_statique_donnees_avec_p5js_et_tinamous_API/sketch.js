/* Exemple d'affichage de données de luminosité 
 *   données hébergées sur https://tinamous.com/ et récupérées via l'API de Tinamous
 * 20200526 pierre@lesporteslogiques.net
 * p5.js v1.0.0
 * 
 * données brutes du capteur : https://lesporteslogiques.tinamous.com/Devices/noir
 */

let datastring;             // chaine de caractère contenant le résultat de la requête
let mesure = [];            // tableau des données utiles
let DEBUG = false;

function preload() {
  
  // Passer par un proxy pour court-circuiter les contraintes CORS
  let url = 'https://cors-anywhere.herokuapp.com/https://lesporteslogiques.tinamous.com/api/v1/measurements/noir/0?startDate=2020-04-26T08:00:00.000&endDate=2020-04-26T15:00:00.000&limit=240&sortOrder=Asc';
  
  // Il est nécessaire d'utiliser httpDo car l'API de Tinamous demande à ce que le type de données soit précisé 
  // dans la requête (JSON ou XML)
  httpDo(
    url,
    {
      method: 'GET',
      datatype:'json',
    },
    function(res) {        // Fonction de callback activée si la requête est réussie
      datastring = res;
      if (DEBUG) console.log(res);
    },
		function(err) {        // Fonction de callback activée si la requête a échoué
			if (DEBUG) console.log(err);
		}
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
}

function draw() {
  background(200);
  
  if (!datastring) {                        // En attendant que les données soient reçues ...
    
    textAlign(CENTER);
    stroke(0);
    strokeWeight(3);
    fill(255);
    textSize(32);
    text("loading...", 0, windowHeight/2, windowWidth, 40 );
    
  } else {                                  // Dès que les données sont reçues ...
    
    let data = JSON.parse(datastring);      // Transformer les données en objet javascript
    
    let min = 4096;                         // Cette variable contiendra la valeur minimum des données récupérées
    let max = 0;                            // Cette variable contiendra la valeur maximum des données récupérées
    let colonnes = data.length;             // Nombre de colonnes à afficher
    let largeur = windowWidth / colonnes;   // Largeur des colonnes, en pixels 
    
    if (DEBUG) console.log("nombre de colonnes : " + colonnes + ", largeur : " + largeur + " pixels");
    
    for (let i = 0; i < data.length; i++) {
      mesure[i] = parseInt(data[i].Fields[0].RawValue, 10); // La données doit être transformée en nombre entier
      if (mesure[i] > max) max = mesure[i];  
      if (mesure[i] < min) min = mesure[i];
      if (DEBUG) console.log("mesure #" + i + " : " + mesure[i]);
    }
    
    if (DEBUG) console.log("min : " + min + ", max : " + max);
    
    // Mesures relatives à min et max
    for (let i = 0; i < colonnes; i++) {
      let couleur = map(mesure[i], min, max, 0, 255);
      fill(couleur);
      stroke(127);
      rect(i*largeur, 0, largeur, windowHeight); 
    }
    
    // Mesures absolues
    strokeWeight(4);
    stroke(0);
    for (let i = 0; i < colonnes; i++) {
      if (i > 0) {
        let x0 = (i-1)*largeur + (largeur/2);
        let y0 = map(mesure[i-1], 0, 4096, windowHeight, 0);
        let x1 = i*largeur + (largeur/2);
        let y1 = map(mesure[i], 0, 4096, windowHeight, 0);
        line(x0, y0, x1, y1);
      }
    }
    
    // Légende
    fill(255);
    noStroke();
    rect (20, windowHeight - 60, 360, 30);
    fill(0);
    textAlign(LEFT);
    textSize(12);
    text("Luminosité captée le 26 avril 2020 entre 8h et 15h", 40, windowHeight - 50, width, height);
    
    noLoop();
  } 
}
