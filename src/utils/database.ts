import { MongoClient } from "mongodb";

const uri = `${process.env.MONGO}`;

let client: any;
let clientPromise: any;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  //@ts-ignore
  if (!global._mongoClientPromise) {
    //@ts-ignore
    client = new MongoClient(uri);
    //@ts-ignore
    global._mongoClientPromise = client.connect();
  }
  //@ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  //@ts-ignore
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export { clientPromise };
