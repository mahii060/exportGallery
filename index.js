import express from "express"; // Importing Express.js
import cors from "cors" // Importing CORS for enabling cross-origin requests
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb' // Importing MongoDB client, ObjectId and API version
import 'dotenv/config'; // Loading environment variables from .env file

const app = express(); // Creating Express app instance
const port = process.env.PORT || 5000; // Setting the port from environment variable or fallback to 5000

// Middleware
app.use(cors()) // Enable CORS
app.use(express.json()) // Enable JSON parsing for incoming requests

const uri = process.env.MONGO_URI; // Getting MongoDB connection string from environment variables

// Creating MongoDB client instance with server API version configuration
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connecting to MongoDB server
        await client.connect();

        // Getting reference to "pants" collection from "pantCollection" database
        const pantCollection = client.db("pantCollection").collection("pants");

        // GET all pants
        app.get('/pants', async (req, res) => {
            const cursor = pantCollection.find() // Find all documents in the collection
            const result = await cursor.toArray() // Convert documents to array
            res.send(result) // Send response to client
        })

        // GET a single pant by ID
        app.get('/pants/:id', async (req, res) => {
            const id = req.params.id; // Extracting ID from request parameters
            const query = { _id: new ObjectId(id) }; // Creating query object using ObjectId
            const pant = await pantCollection.findOne(query); // Finding the matching document
            res.send(pant) // Sending the found document
        })

        // POST a new pant
        app.post('/pants', async (req, res) => {
            const pant = req.body; // Getting data from request body
            const result = await pantCollection.insertOne(pant) // Inserting new document
            res.send(result) // Sending insertion result
        })

        // PUT (update) a pant by ID
        app.put('/pants/:id', async (req, res) => {
            const id = req.params.id; // Getting ID from request
            const pant = req.body; // Getting updated data
            const filter = { _id: new ObjectId(id) } // Creating filter using ID
            const options = { upsert: true }; // If document not found, insert new one

            // Creating update object with fields to update
            const updatePant = {
                $set: {
                    name: pant.name, // Updating name
                    price: pant.price, // Updating price
                    quantity: pant.quantity, // Updating quantity
                    description: pant.description, // Updating description
                    category: pant.category, // Updating category
                    size: pant.size, // Updating size
                    photo: pant.photo, // Updating photo URL
                },
            };

            const result = await pantCollection.updateOne(filter, updatePant, options); // Performing the update
            res.send(result) // Sending result to client
        })

        // DELETE a pant by ID
        app.delete('/pants/:id', async (req, res) => {
            const id = req.params.id; // Getting ID from request
            const query = { _id: new ObjectId(id) }; // Creating query object
            const result = await pantCollection.deleteOne(query); // Deleting the document
            res.send(result) // Sending result to client
        })

        // Ping to confirm MongoDB connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Optional: Close MongoDB connection (currently commented out to keep it alive)
        // await client.close();
    }
}

// Running the main function and handling errors
run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
    res.send('export gallery server is running') // Respond to root route
})

// Starting server on defined port
app.listen(port, () => {
    console.log(`Export gallery server is running on port: ${port}`);
})
