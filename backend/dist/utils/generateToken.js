import jwt from "jsonwebtoken";
const secret = process.env.ACCESS_TOKEN_SECRET;
const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, secret, {
        expiresIn: '30d'
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/'
    });
    return token;
};
export default generateToken;
