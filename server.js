// filepath: /Users/mac/Documents/SIDE GIGS/soft-ui-dashboard/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'pages')));

// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
  const userData = req.body;

  const filePath = path.join(__dirname, 'users.json');

  // Read existing users from users.json
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ message: 'Error reading users file' });
    }

    let users = [];
    if (data) {
      users = JSON.parse(data);
    }

    // Add the new user to the list
    users.push(userData);

    // Write updated users back to users.json
    fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ message: 'Error writing to users file' });
      }

      res.status(200).json({ message: 'User added successfully' });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});