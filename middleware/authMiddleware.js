// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const bearertoken = req.header('Authorization');
    const token = bearertoken.split(" ")[1]
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        
        console.log(process.env.JWT_SECRET,"jwt_secretkey")
        console.log(token,"token")
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded,"decoded")
        req.id = decoded.id;
        console.log(req.id)
        next();

    } catch (err) {
        console.log(err,"err")
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
