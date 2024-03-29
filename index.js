const express = require ('express');
const cors = require('cors');
const app =express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

require('dotenv').config()

const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q3p5ewm.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
      
        await client.connect();
        await client.db("admin").command({
            ping: 1
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('doctor is running');
})
// 
app.listen(port, ()=>{
    console.log(`Car Server is running on port ${port}`);
})