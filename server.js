require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "teju04",
    database: process.env.DB_NAME || "contact_db",
});

app.use(express.static(path.join(__dirname, "public")));

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // For parsing JSON bodies

// User Contact Form
app.post("/contact", (req, res) => {
    const { name, email, phone, message } = req.body;

    const query = "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, phone, message], (err, results) => {
        if (err) {
            console.error("Error inserting data into contact1:", err);
            res.status(500).json({ success: false, message: 'Error submitting message' });
        } else {
            res.status(200).json({ success: true, message: 'Message submitted successfully' });
        }
    });
});

// Serve static HTML files
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});