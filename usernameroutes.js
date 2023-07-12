const express = require('express');
const router = express.Router();
const Username = require('../models/Username');

// Create
router.post('/username', (req, res) => {
  const { name } = req.body;

  const newUsername = new Username({
    name,
  });

  newUsername.save()
    .then(() => {
      res.status(201).json({ message: 'Username created successfully' });
    })
    .catch((err) => {
      console.log('Error creating username', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Read
router.get('/username', (req, res) => {
  Username.find()
    .then((usernames) => {
      res.status(200).json(usernames);
    })
    .catch((err) => {
      console.log('Error fetching usernames', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Update
router.put('/username/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  Username.findByIdAndUpdate(id, { name }, { new: true })
    .then((updatedUsername) => {
      res.status(200).json(updatedUsername);
    })
    .catch((err) => {
      console.log('Error updating username', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Delete
router.delete('/username/:id', (req, res) => {
  const { id } = req.params;

  Username.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Username deleted successfully' });
    })
    .catch((err) => {
      console.log('Error deleting username', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
