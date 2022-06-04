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
        res
        .status(400)
        .send({
            "msg" : "No command found"
        });
    else if (req.body.perm === undefined || !(req.body.perm === "root" || req.body.perm == "user"))
        res
        .status(400)
        .send({
            "msg" : "Bad permissions"
        });
    else {
        if (req.body.perm === "root" && !(req.body.command.replace(" ", "").replace("\n", "") === "stop"))
            req.body.command = "echo $(< /usr/local/src/.server.exwrap_info.txt) | sudo -kS -p '' " + req.body.command;
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
