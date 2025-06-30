const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ msg: "Access Denied! Login First !!!" });
        }

        let verfiedToken = jwt.verify(token, "my-secret-key");
        req.user = verfiedToken;

        next();
    } catch (error) {
        res.status(403).json({ msg: "Bad Authorization! Token Expired" })
    }
}

module.exports = authMiddleware;