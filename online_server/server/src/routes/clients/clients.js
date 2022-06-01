const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var data = []
    Object.entries(clients).forEach(([key, client]) => {
        var new_data = {};
        new_data[client.client_id] = client.client_name;
        data.push(new_data);
    });
    res
    .status(200)
    .send(data);
})

module.exports = router;