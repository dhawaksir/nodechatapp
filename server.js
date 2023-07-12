// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const path = require('path');
// const http = require('http');
// const socketIO = require('socket.io');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// require('events').EventEmitter.defaultMaxListeners = 15;

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server); // Initialize Socket.IO with the server instance
// const port = 3000;

// // Set up middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'secret-key',
//   resave: true,
//   saveUninitialized: true
// }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dhawaksir:ALLMIpT7g2q5MNM2@cluster0.g368sy3.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Failed to connect to MongoDB:', error);
//   });

// // Define the user schema and model
// const User = require('./user');

// // Define the message schema and model
// const Message = require('./message');

// // Set up a route to serve the HTML and client-side scripts
// // Routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.get('/signup.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'signup.html'));
// });

// app.get('/login.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.get('/index.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/chat.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'chat.html'));
// });

// app.get('/alert.mp3', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'alert.mp3'));
// });

// app.get('/video-call/:roomId/:callId', (req, res) => {
//   res.render('room', { roomId: req.params.roomId, callId: req.params.callId });
// });


// // Route to handle user registration
// app.post('/api/register', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if a user with the same username already exists
//     const existingUser = await User.findOne({ username });

//     if (existingUser) {
//       // A user with the same username already exists
//       return res.status(409).json({ error: 'Username already exists' });
//     }

//     // Hash the password before storing it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user instance
//     const newUser = new User({
//       username,
//       password: hashedPassword
//     });

//     // Save the new user to the database
//     await newUser.save();

//     // Registration successful
//     res.status(200).json({ message: 'Registration successful' });
//   } catch (error) {
//     // Handle any potential error
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Set up Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle new chat messages from clients
//   socket.on('chat message', async (message) => {
//     console.log('Received message:', message);

//     try {
//       // Create a new message document
//       const newMessage = new Message({
//         sender: message.sender,
//         text: message.text
//       });

//       // Save the message to the database
//       await newMessage.save();

//       // Broadcast the message to all connected clients
//       io.emit('chat message', newMessage);
//     } catch (error) {
//       console.error('Failed to save message:', error);
//     }
//   });

//   // Handle user disconnect
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//     if (socket.username) {
//       const text = `${socket.username} has disconnected from the chat`;
//       const leaveMessage = { sender: 'System', text };
//       io.emit('chat message', leaveMessage);
//     }
//   });

//   // Handle user join
//   socket.on('user join', (username) => {
//     console.log('User joined:', username);
//     socket.username = username;
//     const text = `${username} has joined the chat`;
//     const joinMessage = { sender: 'System', text };
//     io.emit('chat message', joinMessage);
//   });
// });

// // Start the server
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('events').EventEmitter.defaultMaxListeners = 15;

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // Initialize Socket.IO with the server instance
const port = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dhawaksir:ALLMIpT7g2q5MNM2@cluster0.g368sy3.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Define the user schema and model
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Define the message schema and model
const Message = mongoose.model('Message', {
  sender: String,
  text: String,
});

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: true,
  saveUninitialized: true
}));


// // Set up a route to serve the HTML and client-side scripts
// // Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/chat.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

app.get('/alert.mp3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'alert.mp3'));
});

app.get('/video-call/:roomId/:callId', (req, res) => {
  res.render('room', { roomId: req.params.roomId, callId: req.params.callId });
});
app.get('/video-call/:roomId/:callId', (req, res) => {
  res.render('room', { roomId: req.params.roomId, callId: req.params.callId });
});

// Route to handle user registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // A user with the same username already exists
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Registration successful
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    // Handle any potential error
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle user login
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    req.session.username = username;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to check if the user is logged in
app.get('/api/check-login', (req, res) => {
  const username = req.session.username;

  if (username) {
    // User is logged in
    res.status(200).json({ loggedIn: true, username });
  } else {
    // User is not logged in
    res.status(200).json({ loggedIn: false });
  }
});

// CRUD operations for usernames

// Create a new username
app.post('/api/usernames', async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const newUser = new User({ username });
    await newUser.save();

    res.status(201).json({ message: 'Username created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all usernames
app.get('/api/usernames', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific username
app.get('/api/usernames/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a username
app.put('/api/usernames/:id', async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username;
    await user.save();

    res.status(200).json({ message: 'Username updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a username
app.delete('/api/usernames/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Username deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Set up Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle new chat messages from clients
  socket.on('chat message', async (message) => {
    console.log('Received message:', message);

    try {
      // Create a new message document
      const newMessage = new Message({
        sender: message.sender,
        text: message.text
      });

      // Save the message to the database
      await newMessage.save();

      // Broadcast the message to all connected clients
      io.emit('chat message', newMessage);
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    if (socket.username) {
      const text = `${socket.username} has disconnected from the chat`;
      const leaveMessage = { sender: 'System', text };
      io.emit('chat message', leaveMessage);
    }
  });

  // Handle user join
  socket.on('user join', (username) => {
    console.log('User joined:', username);
    socket.username = username;
    const text = `${username} has joined the chat`;
    const joinMessage = { sender: 'System', text };
    io.emit('chat message', joinMessage);
  });
});


// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
