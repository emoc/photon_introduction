# Affichage statique de données avec p5.js et l'API de Tinamous  


[Tinamous](http://tinamous.com/) est un service de stockage de données en ligne, gratuit pour un usage léger.  
Pour cet exemple les données ont été envoyées par un capteur de luminosité relié à un Photon. Le capteur a été actif entre le 13 mars 2020 et le 3 mai 2020, ([historique complet](https://lesporteslogiques.tinamous.com/Devices/noir/MeasurementHistory))  
Les données sont récupérées sous la forme d'un fichier JSON et affichées par p5.js. Une fois les données affichées le programme s'arrête.

Le résultat est visible ici : [API Tinamous + p5.js](http://emoc.org/introduction_photon/affichage_statique_donnees_avec_p5js_et_tinamous_API/)  

## Montage

![schéma de montage du circuit](./affichage_dynamique_breadboard.png)

## Détails sur le fonctionnement  


Le type de données renvoyées par l'API est précisé par la requête envoyée, la requête est préparée en utilisant la fonction **HttpDo()** de p5.js

La requête faite à l'API renvoie une chaîne de caractère, celle ci est transformée en objet par la méthode **JSON.parse()**

Avant de l'inclure dans le programme, la requête peut être testée avec **curl** :
```
curl -X GET --header 'Accept: application/json' 'https://lesporteslogiques.tinamous.com/api/v1/measurements/noir/0?startDate=2020-04-26T08:00:00.000&endDate=2020-04-26T15:00:00.000&limit=240&sortOrder=Asc'
```


### API Tinamous 


Documentation : https://tinamous.com/ApiDocs

Les dates utilisées dans les requêtes de l'API sont écrites sous cette forme : **2020-04-26T12:00:00.000**


## Ressources utiles 


p5.js : fonction [HttpDo()](https://p5js.org/reference/#/p5/httpDo)  
javascript : fonction [parseInt()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/parseInt)  
javascript : méthode [JSON.parse()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON/parse)  
javascript : [utiliser des tableaux comme type de données (Array)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Objets_%C3%A9l%C3%A9mentaires_JavaScript)  
Le [format de données JSON](https://fr.wikipedia.org/wiki/JavaScript_Object_Notation)  
Affichage structuré de données JSON http://json.parser.online.fr/  
curl : https://curl.haxx.se/  
