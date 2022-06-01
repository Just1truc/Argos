exports.checkClientId = (req, res, next) => {
    if (req.params.client_id === undefined)
        return res
        .status(400)
        .send(
        {
            "msg" : "No client id found"
        });
    else if (clients.hasOwnProperty(String(req.params.client_id)) === false)
        return res
        .status(400)
        .send(
        {
            "msg" : "Client id does not exists"
        });
    else {
        req.client_id = req.params.client_id;
        next();
    }
}

exports.anyUndefined = (args) => {
    // Args.some test si args contient un undefined
    return args.some(arg => arg === undefined);
}