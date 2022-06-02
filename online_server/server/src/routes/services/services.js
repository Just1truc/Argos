const express = require('express');
const router = express.Router();

async function getData(req) {
    clients[req.client_id].emit("message", {
        type: "command",
        "command" : req.body.command
    });
    return new Promise(resolve => {
        clients[req.client_id].on("command_output",
            (response) => {
                resolve(response);
            }
        );
    });
}

router.post("/shell", (req, res) => {
    if (req.body.command === undefined)
        res.status(400).send({
            "msg" : "No command found"
        })
    else {
        const response = getData(req);
        response
            .then((data) => {
                res.status(200).send(data);
            });
    }
});

router.get("/", (req, res) => {
    res.status(200).send([
        "shell"
    ])
}
)

module.exports = router;
