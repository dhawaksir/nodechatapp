const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// Set up a connection URL to your MongoDB server
const url = 'mongodb://localhost:27017'; // Update with your MongoDB server URL
const dbName = 'chatapp'; // Update with your database name

// Create
router.post('/messages', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log('Error occurred while connecting to MongoDB', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const db = client.db(dbName);
    const messagesCollection = db.collection('messages');

    // Extract the message data from the request body
    const { sender, text } = req.body;

    // Create a new message object
    const newMessage = {
      sender: sender,
      text: text,
      timestamp: new Date()
    };

    // Insert the new message into the messages collection
    messagesCollection.insertOne(newMessage, (err, result) => {
      if (err) {
        console.log('Error occurred while inserting new message', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.status(201).json({ message: 'Message created successfully' });
    });
  });
});

// Read
router.get('/messages', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log('Error occurred while connecting to MongoDB', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const db = client.db(dbName);
    const messagesCollection = db.collection('messages');

    // Retrieve all messages from the messages collection
    messagesCollection.find({}).toArray((err, messages) => {
      if (err) {
        console.log('Error occurred while retrieving messages', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.status(200).json(messages);
    });
  });
});

// Update
router.put('/messages/:id', (req, res) => {
  const messageId = req.params.id;

  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log('Error occurred while connecting to MongoDB', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const db = client.db(dbName);
    const messagesCollection = db.collection('messages');

    // Extract the updated message data from the request body
    const { sender, text } = req.body;
    const updatedMessage = {
      $set: {
        sender: sender,
        text: text,
        timestamp: new Date()
      }
    };

    // Update the message in the messages collection
    messagesCollection.updateOne({ _id: mongodb.ObjectID(messageId) }, updatedMessage, (err, result) => {
      if (err) {
        console.log('Error occurred while updating message', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.status(200).json({ message: 'Message updated successfully' });
    });
  });
});

// Delete
router.delete('/messages/:id', (req, res) => {
  const messageId = req.params.id;

  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log('Error occurred while connecting to MongoDB', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const db = client.db(dbName);
    const messagesCollection = db.collection('messages');

    // Delete the message from the messages collection
    messagesCollection.deleteOne({ _id: mongodb.ObjectID(messageId) }, (err, result) => {
      if (err) {
        console.log('Error occurred while deleting message', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.status(200).json({ message: 'Message deleted successfully' });
    });
  });
});

module.exports = router;
