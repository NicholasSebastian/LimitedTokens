import { MongoClient, Db } from 'mongodb';

interface IConnection {
  client: MongoClient
  database: Db
}

let cache = (global as any).mongo;
if (!cache) {
  cache = (global as any).mongo = { connection: null };
}

async function connectToDatabase(): Promise<IConnection> {
  if (cache.connection) {
    return cache.connection;
  }
  else {
    const username = encodeURIComponent(process.env.DB_USERNAME);
    const password = encodeURIComponent(process.env.DB_PASSWORD);
    const hostname = process.env.DB_URL;
    const databaseName = process.env.DB_NAME;

    const uri = `mongodb+srv://${username}:${password}@${hostname}/?authMechanism=DEFAULT&retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    cache.connection = {
      client,
      database: client.db(databaseName)
    }
    return cache.connection;
  }
}

export default connectToDatabase;