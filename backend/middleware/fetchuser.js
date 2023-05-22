var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // fetch user from jwt token and add id to req object
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ error: 'Authenticate using a valid token' });
    }

    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        req.user = decodedToken.user;

        next();
    }
    catch (error) {
        res.status(401).send({error: 'Authenticate using a valid token'});
    }
};

module.exports = fetchuser;