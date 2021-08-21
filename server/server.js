var PouchDB = require('pouchdb');
var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())

app.use('/db', require('express-pouchdb')(PouchDB));
var parkingPouch = new PouchDB('parking');

app.get('/', (req,res) =>{
    res.send("It works");
})

//Start server
app.listen(1000);

console.log("Running at Port 1000");