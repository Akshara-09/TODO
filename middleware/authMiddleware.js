
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const bearertoken = req.header('Authorization');
    const token = bearertoken.split(" ")[1]
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        req.id = decoded.id;
       
        next();

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
