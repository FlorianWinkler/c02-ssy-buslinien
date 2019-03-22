const express = require('express');
const database = require('../src/database');
const request = require('request');

const router = express.Router();


let subscriber=[];

subscriber.push('http://localhost:3000/tickets');
subscriber.push('http://localhost:3000/kmpreis');

router.post('/',function (req,res) {
    let responses=[];
    for(let s of subscriber){
       console.log(s);
       request.post({
           url: s,
           body: req.body,
           json: true
       },processResponse);
   }

    function processResponse(error, response, body){
        responses.push(body);
        if(responses.length === subscriber.length){
            res.json(responses);
        }
    }

   //res.json(true);
});



module.exports=router;
