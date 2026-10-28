import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ehaajbu.mongodb.net/`);

export async function connectToMongoDB(){
    try{
        await client.connect();
         console.log("You successfully connected to MongoDB!");
         return client
    }catch(err){
        console.dir(err);
    }
}

const connectedClient = await connectToMongoDB();
const db = connectedClient.db('crudopration') ;
const usres = db.collection('user')

app.get('/',(req, res)=>{
    res.send("hello world")
});
app.get("/users", async(req,res)=>{
    const corsur = usres.find({});
      const allusers = await corsur.toArray();
      res.send(allusers)
})
app.post("/users", async(req,res)=>{
    const newUser = req.body
    console.log("request",newUser)
    const result = await usres.insertOne(newUser)
    res.send(result)
})

app.listen(port , ()=>{
    console.log(`Example app listening on port ${port}`)
});