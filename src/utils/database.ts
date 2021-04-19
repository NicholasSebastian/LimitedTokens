import { MongoClient } from 'mongodb';

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const hostname = process.env.DB_URL;

const uri = `mongodb+srv://${username}:${password}@${hostname}/?authMechanism=DEFAULT&retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default dbClient;