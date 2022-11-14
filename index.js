const { MongoClient } = require("mongodb");

async function main (){

    const uri = 'mongodb+srv://fionaeckert:testtest123@cluster0.ipafn7l.mongodb.net/test'

    const client = new MongoClient(uri);
    try{
    await client.connect();
    
    // await deleteTeacherbyUsername(client, "test1")

    // await updateStudentsbyUsername(client, "test1", {updatedUsername: "updatedtest1"})

    // inserts new Teacher users into database
    // await createTeacherUser(client,{
    //     username: '',
    //     password: ''
    //     });
    // inserts new Student users into database
    // await createStudentUser(client,{
    //     username: '',
    //     password: ''
    //     });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error)


// new user creation function for Students collection
async function createStudentUser(client, newStudentUser){
   const result = await client.db("Rudi").collection("Rudi Test Users - Students").insertOne(newStudentUser);
   console.log(`New listing created with the following id: ${result.insertedId}`)
}

// new user creation function for Teachers collection
async function createTeacherUser(client, newTeacherUser){
    const result = await client.db("Rudi").collection("Rudi Test Users - Teacher").insertOne(newTeacherUser);
    console.log(`New listing created with the following id: ${result.insertedId}`)
 }

// creates many student users
async function createManyStudentUsers(client, newStudentUsers){
    const result = await client.db("Rudi").collection("Rudi Test Users - Students").insertMany(newStudentUsers);
    console.log(`${result.insertedCount} new student users created with the following IDs:`)
    console.log(`${result.insertedIds}`)
}

// creates many teacher users
async function createManyTeacherUsers(client, newTeacherUsers){
    const result = await client.db("Rudi").collection("Rudi Test Users - Teacher").insertMany(newTeacherUsers);
    console.log(`${result.insertedCount} new student users created with the following IDs:`)
    console.log(`${result.insertedIds}`)
}

// will update the first matching result from the query
async function updateTeacherbyUsername(client, username, updatedUsername){
 const result = await client.db("Rudi").collection("Rudi Test Users - Teacher").updateOne({username:username},{$set:updatedUsername})
 console.log(`${result.matchedCount} documents matched the query criteria.`)
 console.log(`${result.modifiedCount} documents was/were updated.`)

}


// will delete the first matching result
async function deleteTeacherbyUsername(client, username){
    const result = await client.db("Rudi").collection("Rudi Test Users - Teacher").deleteOne({username:username})
    console.log(`${result.deletedCount} documents was/were deleted.`)
   }

// lists the databases in the cluster
async function listDatabases(client) {
   const databasesList = await client.db().admin().listDatabases()

   console.log("Databases:");
   databasesList.databases.forEach(db => {
    console.log(`-${db.name}`)
   })
}