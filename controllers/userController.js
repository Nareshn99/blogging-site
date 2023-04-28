import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';

export const createUser = async (req, res) => {
    try {
        const { UserName, Email, Password } = req.body;

        const schema = Joi.object({
            UserName: Joi.string().min(3).max(30).required(),
            Email: Joi.string().email().required(),
            Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })

        const { error } = schema.validate({ UserName, Email, Password });
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else {
            const user = await userModel.findOne({ Email });
            if (user) {
                return res.status(409).send({ status: false, message: "Email Already Email!!" })
            }
            const hashedPass = await bcrypt.hash(Password, 10)
            const data = await userModel.create({ UserName, Email, Password: hashedPass })
            return res.status(201).send({ status: true, message: "User Register Successfully", data })
        }

    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error while Create user" })
    }
}


export const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const schema = Joi.object({
            Email: Joi.string().email().required(),
            Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })

        const { error } = schema.validate({ Email, Password });
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else {
            const user = await userModel.findOne({ Email });
            if (!user) {
                return res.status(404).send({ status: false, message: "User Not Found!!" })
            }
            const pass = await bcrypt.compare(Password, user.Password)
            if (!pass) {
                return res.status(400).send({ status: false, message: "Invalid Creadantial" })
            }

            const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: "1d" });
            return res.status(200).send({ status: true, message: "User Login Successfully", data: token })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error while Create user" })
    }
}


