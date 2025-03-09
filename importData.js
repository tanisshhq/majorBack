const mongoose = require('mongoose');
const fs = require('fs');
const Item = require('./models/itemsModel'); // Adjust the path to your Item model
const dataPath = './data.json'; // Adjust the path to your JSON data file

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,bufferCommands: false });

const db = mongoose.connection;

// Read the JSON data
const items = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Function to import data
const importData = async () => {
  try {
    // Insert data into the Items collection
    await Item.create(items);
    console.log('Data imported successfully');
  } catch (err) {
    console.error('Error importing data:', err);
  } finally {
    // Close the database connection
    db.close();
  }
};

// Run the import function
importData();
