const express = require('express')
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.33r9n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
  

    const database = client.db("artCraftStore");
    const craftCollection = database.collection("artCraft");

    // * read multiple data - Find Multiple Document
    app.get('/artcraftstore', async(req, res) => {
        const cursor = craftCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    // * read email data - Find Multiple Document 
    app.get('/artcraftstore/:email', async(req, res) => {
      const cursor = craftCollection.find({ email: req.params.email});
      const result = await cursor.toArray();
      res.send(result);
  })

  // * read single data for view details page - Find One Document
  app.get('/artcraftstore/detailsProduct/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = await craftCollection.findOne(query);
    res.send(result);
  })

   
    // * receive data from client side - Insert a Document
    app.post('/artcraftstore', async(req, res) => {
    const artCraft = req.body;

    // get the  user's name, email, and photoURL from client site
    const { name, email, photoURL, itemName, subcategory, shortDescription, price, rating, photo, customization, processingTime, stockStatus } = artCraft;
    console.log("Art Craft Item:", artCraft);

    // * Insert the item into the collection, including the user details
    const result = await craftCollection.insertOne({
        name,
        email,
        photoURL,  // Store the user's photoURL
        itemName,
        subcategory,
        shortDescription,
        price,
        rating,
        photo,
        customization,
        processingTime,
        stockStatus,
        
    });

    res.send(result);
});

    // TODO Update user
    app.put('/artcraftstore/detailsProduct/:id', async(req, res) => {
      const id = req.params.id;
      const updateItems = req.body;
      console.log('update', id, updateItems)
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const updateItem = {
        $set: {
          itemName: updateItems.itemName,
          subcategory: updateItems.subcategory,
          shortDescription: updateItems.shortDescription,
          price: updateItems.price,
          rating: updateItems.rating,
          photo: updateItems.photo,
          customization: updateItems.customization,
          processingTime: updateItems.processingTime,
          stockStatus: updateItems.stockStatus,
        }
      }
      const result = await craftCollection.updateOne(filter, updateItem, options);
      res.send(result)
    })


    // TODO Delete a document
    app.delete('/artcraftstore/delete/:id', async(req, res) => {
      const id = req.params.id;
      console.log('delete id is', id)
      const query = {_id: new ObjectId(id)}
      const result = await craftCollection.deleteOne(query)
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
  res.send('Art&Craft Server is running')
})

app.listen(port, () => {
  console.log(`Art Craft Server is running on: ${port}`)
})