import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ehaajbu.mongodb.net/`);

app.get('/',(req, res)=>{
    res.send("hello world")
});

app.listen(port , ()=>{
    console.log(`Example app listening on port ${port}`)
});