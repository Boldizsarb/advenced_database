

const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");

const { MONGODB_URI } = process.env;



const client = new MongoClient(MONGODB_URI);

async function main() {
  try {
    await client.connect();
    const db = client.db();

    await listDatabases(client);
    //await createCollection(client,"cards");  //used to create the cards collection 





    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }finally{
    await client.close();
}
}

main().catch(console.error);


async function listDatabases(client){
  const databaseList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databaseList.databases.forEach(db => console.log(` - ${db.name}`));  //printing all the databases 

}

async function createCollection(client,collectionName){   /// Creating a collection 

  const result = await client.db("test").createCollection(collectionName);
  console.log(`Created collection with the name '${result.collectionName}'`);

}