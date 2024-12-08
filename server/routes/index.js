const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

// Make sure you have this line somewhere in your server setup
// app.use(express.static('public'));

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../../public/images/manga');
        fs.ensureDirSync(dir);
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, 'world-tree-1.png');
    }
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    res.render("landing", { title: "Welcome to Neiji" });
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

router.get("/try", (req, res) => {
    res.render("try");
});

// Add upload endpoint
router.post("/upload-manga", upload.single('manga'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ success: true, message: 'File uploaded successfully' });
});

module.exports = router;