const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dsa_tracker';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`
----------------------------------------------------------------------
ℹ️  NOTICE: MongoDB is not currently running locally (${error.message}).
   The server has started in IN-MEMORY FALLBACK MODE so you can test
   all features immediately without any database setup!

   To connect to a persistent MongoDB database:
   1. Local: Start MongoDB (net start MongoDB or mongod)
   2. Cloud: Set MONGODB_URI in backend/.env to your MongoDB Atlas URI:
      MONGODB_URI=mongodb+srv://<user>:<pwd>@cluster0.mongodb.net/dsa_tracker
----------------------------------------------------------------------
    `);
  }
};

module.exports = connectDB;
