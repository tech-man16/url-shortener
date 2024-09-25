import { MongoClient } from 'mongodb';

// Replace with your MongoDB instance URL
const uri = `${process.env.MONGODB_URI}`;
const dbName = 'url-manager'; // Replace with your database name

const options: any = { // https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connection-options/
  serverSelectionTimeoutMS: 5000,
  maxConnecting: 5,
  maxPoolSize: 300
}

let client: any;

async function connect() {
  if (!client)
    client = await MongoClient.connect(uri, options);          // https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
  return client.db(dbName);
}

async function disconnect() {
  if (!client) {
    await client.close();
    console.log("Disconnected successfully !!")
  }
}

export { connect, disconnect };