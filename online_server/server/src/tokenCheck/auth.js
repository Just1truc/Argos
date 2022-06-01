const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send({"msg" : "No token, authorization denied"});
  
    jwt.verify(token, process.env.SECRET, (err, decryptedToken) => {
        if (err)
            return res
            .status(401)
            .send(
            {
                "msg" : "Token is not valid"
            });
        else if (
           decryptedToken.username !== process.env.USERNAME
        || decryptedToken.password !== process.env.PASSWORD)
            return res
            .status(401)
            .send(
            {
                "msg" : "Token is not valid"
            });
        else
            next();
    });
};
