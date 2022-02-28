const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    res.json({ type: "USER router" });
});

module.exports = router;