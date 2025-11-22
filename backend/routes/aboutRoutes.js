const express = require('express');

const router = express.Router();

// GET /about - returns information about the company
router.get('/', (req, res) => {
    // render a server template or send JSON / static HTML
    res.render('about', { title: 'About Us' });
    // or: res.sendFile(path.join(__dirname, '../public/about.html'));
});

module.exports = router;