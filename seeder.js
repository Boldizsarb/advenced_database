const { MongoClient } = require("mongodb");  //connect to mongo db
require("dotenv").config();
const { MONGODB_URI } = process.env;        //  mongo api 

const client = new MongoClient(MONGODB_URI);


async function main(){
    try{
        await client.connect();
        const db = client.db();

        await listDatabases(client); // printing the databases! 

        //await createCollection(client,"test_two") // creating collection 

        await listCollections(client,"testhere") // printing the collections

       // await createDatabase(client,"testdatabase", "testcollection") // creating database working 

        //await createDocument(client,"testhere","test_two", {name: "test", price: 100, bedrooms: 2, bathrooms: 1}) // one document only

        //await createMultipleDocuments(client,"testhere","test_two", [{name: "test", price: 100, bedrooms: 2, bathrooms: 1}, {name: "test", price: 100, bedrooms: 2, bathrooms: 1}])

        // agregation comes here 



    }catch(error){
        console.error("error:", error);
        process.exit();
    } finally{
        await client.close();
    }
}
main().catch(console.error); // calling the main function 

///////////////////////////////// Creating  ///////////////////////////////////////////////////////
async function createDocument(client,databaseName,collectionName, newListing){

    const result = await client.db(databaseName).collection(collectionName).insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function createMultipleDocuments(client,databaseName,collectionName, newListing){

    const result = await client.db(databaseName).collection(collectionName).insertMany(newListing);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

async function createCollection(client,collectionName){

    const result = await client.db("testhere").createCollection(collectionName);
    console.log(`Created collection with the name '${result.collectionName}'`);

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
async function listCollections(client,databaseName){
    const databaseList = await client.db(databaseName).listCollections().toArray();
    console.log("Collections:");
    databaseList.forEach(db => console.log(` - ${db.name}`));  //printing all the collections 
}

async function createDatabase(client,databaseName,collectionName){
    
        const db = await client.db(databaseName);
        await db.createCollection(collectionName);
        console.log(`Created database with the name '${db.databaseName}' with the '${db.collectionName}' Collection name!`);
}

async function listDatabases(client){
    const databaseList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databaseList.databases.forEach(db => console.log(` - ${db.name}`));  //printing all the databases 

}