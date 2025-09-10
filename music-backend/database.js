const mongoose = require('mongoose');
const { Test } = require("./testModel.js");

const connectDatabase = async () => {

    // const client = new MongoClient(MongoDB_URI, {
    //     tlsAllowInvalidCertificates: true, // 👈 add this, remove in productio 
    // });

    // try {
    //     await client.connect();
    //     console.log("✅ Connected successfully to MongoDB");
    //     const result = await client.db("admin").command({ ping: 1 });
    //     console.log("✅ Ping Result:", result);
    // } catch (err) {
    //     console.error("❌ Connection failed:", err);
    // }

    mongoose.connect( process.env.MongoDB_URI)
        .then(async () => {
            console.log('✅ Connected to MongoDB Atlas');
            // Insert a sample document
            const doc = await Test.create({ name: 'Ping', value: 1 });
            console.log('✅ Document inserted:', doc);
            const deletedDocument = await Test.findOneAndDelete({ name: 'Ping' });
            console.log("Deleted Document = ", deletedDocument);
        })
        .catch((err) => {
            console.error('❌ MongoDB connection error:', err);
        });
};

module.exports = { connectDatabase };