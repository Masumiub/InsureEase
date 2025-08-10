import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const client = new MongoClient(uri, options);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // @ts-expect-error: Global variable for MongoClient in dev mode
  if (!global._mongoClientPromise) {
    // @ts-expect-error: Assign MongoClient promise to global in dev mode
    global._mongoClientPromise = client.connect();
  }
  // @ts-expect-error: Retrieve MongoClient promise from global in dev mode
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
