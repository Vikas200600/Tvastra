const express = require('express');
const router = express.Router();

router.route('/test').get((req, res) => {
    res.json({
        error: "none",
        message: "Server Test Success",
        status: 200,
        data :null
    })
});

module.exports = router;