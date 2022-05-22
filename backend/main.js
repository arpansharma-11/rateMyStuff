const { MongoClient, ObjectId } = require("mongodb");
const Express = require("express");
const Cors = require("cors"); // USed fot Cross Origin resource Sharing , which is sharing code beween local host 2000(Backend) and 5000(frontend) for this project.
const BodyParser = require("body-parser");
const { request, response } = require("express");

const client = new MongoClient("");
const server = Express();

server.use(Express.json());
server.use(Express.urlencoded({ extended: true }));
server.use(Cors());

var collection;




server.get("/search", async (request, response) => {
    try {
        let result = await collection.aggregate([
            {
                "$search": {
                    "autocomplete": {
                        "query": `${request.query.term}`,
                        "path": "name", 
                        "fuzzy": {
                            "maxEdits": 2 
                        }
                    } 
                }
            }
        ]).toArray();
        response.send(result); 

    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});



server.get("/get/:id", async(request, response) => {
    try{
        let result = await collection.findOne({ "_id": ObjectId(request.params.id) });
        response.send(result)
    } catch (e)
    {
        response.status(500).send({ message: e.message });
    }
});


server.listen("2000", async () => {
    console.log("Server connected");
    try {
        await client.connect();
        collection = client.db("University").collection("collegename");
    }
    catch(e) {
        console.error(e);
    }
});
