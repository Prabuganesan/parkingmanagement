var PouchDB = require('pouchdb');
var replicationStream = require('pouchdb-replication-stream');
PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);

const fs = require('fs');
var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())
PouchDB.plugin(replicationStream.plugin);
app.use('/db', require('express-pouchdb')(PouchDB));
var parkingPouch = new PouchDB('parking');

app.get('/', (req,res) =>{
    res.send("It works");
})



app.get('/backup', (req,res) =>{
    var ws = fs.createWriteStream('output.txt');

    parkingPouch.dump(ws).then( response=> {
        console.log(response)
        fs.close()
        res.send("Backup completed");

      }).catch(error=>{
        console.log('err',error)
        fs.close()
        res.send("Backup failed");
      })
})

app.get('/load', (req,res) =>{
    var rs = fs.createReadStream('output.txt');

    parkingPouch.load(rs).then( response=> {
        console.log(response)
        fs.close()
        res.send("Loding completed");

      }).catch(error=>{
        console.log('err',error)
        fs.close()
        res.send("Loading failed");
      })
})
//Start server
app.listen(1000);

console.log("Running at Port 1000");