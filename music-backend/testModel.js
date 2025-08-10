const mongoose = require("mongoose")

// Define schema for 'test' collection
const testSchema = new mongoose.Schema({
    name: String,
    value: Number
});

// Model for 'test' collection in 'database1' database
const Test = mongoose.model('Test', testSchema, 'test');

module.exports = { Test }