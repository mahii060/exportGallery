import express from "express";
import cors from "cors"
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import 'dotenv/config';



const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json())



const uri = process.env.MONGO_URI;

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const pantCollection = client.db("pantCollection").collection("pants");

        app.get('/pants', async (req, res) => {
            const cursor = pantCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/pants/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const pant = await pantCollection.findOne(query);
            res.send(pant)
        })

        app.post('/pants', async (req, res) => {
            const pant = req.body;
            const result = await pantCollection.insertOne(pant)
            res.send(result)
        })

        app.put('/pants/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const pant = req.body;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatePant = {
                $set: {
                    name: pant.name, //name, price, quantity, description, category, size, photo 
                    price: pant.price,
                    quantity: pant.quantity,
                    description: pant.description,
                    CanvasPattern: pant.category,
                    size: pant.size,
                    photo: pant.photo,
                },
            };

            const result = await pantCollection.updateOne(filter, updatePant, options);
            res.send(result)

        })

        app.delete('/pants/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await pantCollection.deleteOne(query);
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('export gallery server is running')
})

app.listen(port, () => {
    console.log(`Export gallery server is running on port: ${port}`);
})