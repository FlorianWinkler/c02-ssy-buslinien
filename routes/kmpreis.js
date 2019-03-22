const express = require('express');
const database = require('../src/database');
const KMPreis = require('../src/KMPreis');

const router = express.Router();

const kmpreisCollection = database.getCollection('kmpreis');

/* INPUT:
    { "km": 3,
      "preis": 3.5,
      "betrieb": "Gelbe-Linie"
    }
   OUTPUT:
   Update von KMPreis
*/

router.post('/',function (req,res) {


    let result = kmpreisCollection.find({linie: req.body.betrieb});

    if(result.length === 0){
        let newKmPreis = new KMPreis(
            req.body.betrieb,
            req.body.km,
            req.body.preis
        );
        res.json(kmpreisCollection.insert(newKmPreis));
    }
    else {
        let kmpreis = result[0];
        kmpreis.sum_km=kmpreis.sum_km+req.body.km;
        kmpreis.sum_preis=kmpreis.sum_preis+req.body.preis;
        kmpreis.preis_pro_km = kmpreis.sum_preis / kmpreis.sum_km;
        kmpreisCollection.update(kmpreis);
        res.json(kmpreis);
    }
});

router.get('/',function (req,res) {
   res.json(kmpreisCollection.find());
});

router.get('/:linie',function (req,res) {
    console.log(kmpreisCollection.find());
    console.log(req.params.linie);
    res.json(kmpreisCollection.findOne({linie: req.params.linie}));
});

module.exports = router;
