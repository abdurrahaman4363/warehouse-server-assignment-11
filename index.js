const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// use middleware
app.use(cors())
app.use(express.json())



// initial server setup
app.get('/', (req, res)=>{
    res.send('server is working')
})

app.listen(port, ()=>{
    console.log('Server is running port:', port);
})


