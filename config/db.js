require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URL);
        console.log('MongoDB Atlas connected successfully');
    } catch (err) {
        console.error('Connection failed:', err.message);
    }
}

module.exports = connectDB;
