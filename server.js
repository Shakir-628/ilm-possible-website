const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the marketing website
app.use(express.static(__dirname));

// Note: Contact form uses EmailJS on the frontend for email sending
// No server-side email endpoint needed

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

