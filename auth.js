const jwt = require('jsonwebtoken');
const JWT_SECRET = 'JCEJDJWJCJQC    341R';

const auth =  (req, res, next) => {
    const token = req.headers.token;
    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        req.userId = decodedData.id;
            next();
    } catch (error) {
        res.status(403).json({
            "Error" : "Invalid token"
        })
        
    }
}

module.exports ={
    auth,
    JWT_SECRET
};