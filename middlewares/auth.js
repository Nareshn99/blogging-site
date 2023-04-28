import jwt from 'jsonwebtoken';
import blogModel from '../models/blogModel.js';

export const authrentication = async (req, res, next) => {
    try {
        const token = req.headers.authrentication;
        const verifyUser=jwt.verify(token,process.env.SECRET);
        if(!verifyUser.userId){
            return res.status(401).send({ status: false, message: "Login Required" })
        }else{
            req.userId=verifyUser.userId;
            next();
        }

    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error On Authrentication" })
    }
}


export const authorization = async (req, res, next) => {
    try {
        const user=await blogModel.findOne({Author:req.userId})
        if(user){
            next();
        }else{
            return res.status(403).send({ status: false, message: "Unauthorized" })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error On Authorization" })
    }
}