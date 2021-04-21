import { MongoClient, Db } from 'mongodb';

interface IConnection {
  client: MongoClient
  database: Db
}

let cached = (global as any).mongo;
if (!cached) {
  cached = (global as any).mongo = { connection: null, promise: null };
}
 
async function connectToDatabase(): Promise<IConnection> {
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    const username = encodeURIComponent(process.env.DB_USERNAME);
    const password = encodeURIComponent(process.env.DB_PASSWORD);
    const hostname = process.env.DB_URL;
    const databaseName = process.env.DB_NAME;

    const uri = `mongodb+srv://${username}:${password}@${hostname}/?authMechanism=DEFAULT&retryWrites=true&w=majority`;
    const connection = MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    cached.promise = connection.then((client) => {
      return {
        client,
        database: client.db(databaseName)
      }
    })
  }
  cached.connection = await cached.promise;
  return cached.connection;
}

export default connectToDatabase;