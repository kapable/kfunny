const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    res.json({ type: "POST router" });
});

module.exports = router;