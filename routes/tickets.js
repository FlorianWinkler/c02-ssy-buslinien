const express = require('express');
const database = require('../src/database');
const Ticket = require('../src/Ticket');

const router = express.Router();

const ticketCollection = database.getCollection("tickets");

/* INPUT:
    { "start": "Sabinenweg",
      "ende": "Alexanderplatz",
      "km": 3,
      "preis": 3.5,
      "betrieb": "Gelbe-Linie"
    }
   OUTPUT:
   Ticket + ID
*/

router.post('/',function (req,res) {
   let newTicket = new Ticket(
       req.body.betrieb,
       req.body.start,
       req.body.ende,
       req.body.km,
       req.body.preis
   );
   res.json(ticketCollection.insert(newTicket));
});

router.get('/',function (req,res) {
   res.json(ticketCollection.find());
});

router.get('/:id',function (req,res) {
   res.json(ticketCollection.get(req.params.id));
});

module.exports = router;
