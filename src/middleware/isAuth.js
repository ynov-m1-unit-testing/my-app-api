const isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
}

module.exports = isAuth;