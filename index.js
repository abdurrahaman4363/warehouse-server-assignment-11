const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// use middleware
app.use(cors())
app.use(express.json())

//DB_USER=warehouseUser
//DB_PASS=@!#3iDTQP-sVwVd

// server connect to mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zj1lt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("bookStore").collection("books");
  console.log('database connected')
  // perform actions on the collection object
  client.close();
});


// initial server setup
app.get('/', (req, res)=>{
    res.send('server is working')
})

app.listen(port, ()=>{
    console.log('Server is running port:', port);
})


