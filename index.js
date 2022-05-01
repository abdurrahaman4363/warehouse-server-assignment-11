const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// use middleware
app.use(cors())
app.use(express.json())


// server connect to mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zj1lt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const productCollection = client.db('warehouse').collection('products');
        const bookCollection = client.db('programming').collection('book');
        const booksCollection = client.db('electronicBook').collection('books');
        const addCollection = client.db('warehouse').collection('add')

        // to load use get method inventory item
        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const inventoryItems = await cursor.toArray();
            res.send(inventoryItems);
        });
        // with email query for add
        app.get('/addItem', async (req, res) => {
            const email = req.query?.email;
            const query = {email:email};
            const cursor = addCollection.find(query);
            const inventoryItems = await cursor.toArray();
            res.send(inventoryItems);
        });
       /*  app.get('/addItem', async (req, res) => {
            const query = {};
            const cursor = addCollection.find(query);
            const inventoryItems = await cursor.toArray();
            res.send(inventoryItems);
        }); */

         // post method
         app.post('/inventory', async(req, res) =>{
            const newInventory = req.body;
            const result = await productCollection.insertOne(newInventory);
            res.send(result);
        })

        // add item
        app.post('/addItem', async(req, res)=>{
            const add = req.body;
            const result = await addCollection.insertOne(add);
            res.send(result);
        })
        app.delete('/addItem/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await addCollection.deleteOne(query);
            res.send(result);
        })

         // delete method
         app.delete('/inventory/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await productCollection.deleteOne(query);
            res.send(result);
        })
       // to load use get method inventory item one
        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventoryItem = await productCollection.findOne(query);
            res.send(inventoryItem);
        })
          // to load use get method programming data
        app.get('/programming', async (req, res) => {
            const query = {};
            const cursor = bookCollection.find(query);
            const book = await cursor.toArray();
            res.send(book);
        });
        // to load use get method electronic data
        app.get('/electronic', async (req, res) => {
            const query = {};
            const cursor = booksCollection.find(query);
            const books = await cursor.toArray();
            res.send(books);
        });

       
    }
    finally {

    }

}

run().catch(console.dir);


// initial server setup
app.get('/', (req, res) => {
    res.send('server is working')
})

app.listen(port, () => {
    console.log('Server is running port:', port);
})


