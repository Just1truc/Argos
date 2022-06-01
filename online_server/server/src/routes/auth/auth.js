const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const tools = require('../../tools/tools');
const jwt = require('jsonwebtoken');

dotenv.config();

function checkAuthRequest(req, res, next) {
    if (
    tools.anyUndefined([req.body.username, req.body.password])
    || req.body.username !== process.env.USERNAME
    || req.body.password !== process.env.PASSWORD
    )
        res
        .status(400)
        .json(
        {
            error: 'Bad Request'
        });
    else
        next();
}

function generateToken() {
    return jwt.sign(
    {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    },
    process.env.SECRET,
    {
        expiresIn: '24h'
    }
    );
}

router.post('/login',
checkAuthRequest,
(req, res) => {
    res.status(200).send({"token": generateToken()});
});

module.exports = router;
