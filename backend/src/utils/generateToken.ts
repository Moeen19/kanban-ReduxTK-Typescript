import { Response } from "express";
import jwt, { Secret } from "jsonwebtoken"
import mongoose from "mongoose";
const secret: Secret = process.env.ACCESS_TOKEN_SECRET || 'DefaultSecret'

const generateToken = (res: Response, userId: mongoose.Types.ObjectId) => {
    const token: string = jwt.sign({ userId }, secret , {
        expiresIn: '30d'
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/'
    })
    return token;
}

export default generateToken;