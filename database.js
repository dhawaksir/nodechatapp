const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://dhawaksir:ALLMIpT7g2q5MNM2@cluster0.g368sy3.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected successfully to MongoDB server');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Handle the error appropriately
  }
}

module.exports = connectToDatabase;
