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

// Contact form endpoint (for logging only, EmailJS sends the actual email)
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, school_name, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // Log the contact submission
        console.log(`Contact submission from: ${name} (${email})`);
        if (school_name) {
            console.log(`School: ${school_name}`);
        }
        console.log(`Message: ${message}\n`);

        // Email is sent via EmailJS on the frontend
        res.json({
            success: true,
            message: 'Thank you! Your message has been sent successfully. Check your email for confirmation.'
        });

    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error processing your message. Please try again.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Email server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

