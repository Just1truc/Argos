const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var data = []
    Object.entries(clients).forEach(([key, client]) => {
        var new_data = {
            "id" : client.client_id,
            "name" : client.client_name
        };
        data.push(new_data);
    });
    res
    .status(200)
    .send(data);
})

module.exports = router;