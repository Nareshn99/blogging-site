import blogModel from "../models/blogModel.js";
import Joi from 'joi';
import userModel from "../models/userModel.js";


//create Blog
export const createBlog = async (req, res) => {
    try {
        const { Title, Author, Contain } = req.body;

        const schema = Joi.object({
            Title: Joi.string().min(3).max(30).required(),
            Author: Joi.string().required(),
            Contain: Joi.string().min(100).max(5000).required()
        })

        const { error } = schema.validate({ Title, Author, Contain });
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else {
            const blog = await blogModel.findOne({ Title });
            if (blog) {
                return res.status(409).send({ status: false, message: "Title Already Email!!" })
            }
            const data = await blogModel.create({ Title, Author, Contain })
            await data.populate("Author")
            return res.status(201).send({ status: true, message: "Blog Created Successfully", data })
        }

    } catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error while Create Blog" })
    }
}



//Get blog
export const getBlog = async (req, res) => {
    try {
        const bId = req.params.bId;
        const blog = await blogModel.findById(bId);
        if (!blog) {
            return res.status(404).send({ status: false, message: "Blog Not Found!!" })
        }
        return res.status(200).send({ status: true, message: "Blog Get Successfully", data: blog })
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error while Blog Get" })
    }
}


//get All blogs
export const getAllBlog = async (req, res) => {
    try {
        const page = 1;
        const blog = await blogModel.find().skip(10 * (page - 1)).limit(10);
        if (blog.length == 0) {
            return res.status(404).send({ status: false, message: "Blogs Not Found!!" })
        }
        return res.status(200).send({ status: true, message: "All Blog Get Successfully", data: blog })
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error while Get All Blog" })
    }
}

//update blog
export const updateBlog = async (req, res) => {
    try {
        const bId = req.params.bId;
        const schema = Joi.object({
            Title: Joi.string().min(3).max(30),
            Contain: Joi.string().min(100).max(5000)
        })

        const { error } = schema.validate({ Title, Contain });
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else {
            const data = await blogModel.findByIdAndUpdate(bId, { ...req.body }, { new: true })
            return res.status(200).send({ status: true, message: "Blog Updated Successfully", data })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error while Update Blog" })
    }
}


//Delete Blog
export const deleteBlog = async (req, res) => {
    try {
        const bId = req.params.bId;
        await blogModel.findByIdAndDelete(bId);
        return res.status(200).send({ status: true, message: "Blog Deleted Successfully" })
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error while Delete Blog" })
    }
}




export const filteredByKeyword = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const page = 1;
        const blogs = await blogModel.find(
            { Contain: { $regex: keyword, $options: 'i' } }
        ).select({ _id: 0, Title: 1, Contain: 1, Author: 1, createdAt: 1 }).sort({ createdAt: -1 }).skip(10 * (page - 1)).limit(10);
        return res.status(200).send({ status: true, message: "Blog Filtered Successfully", data: blogs })

    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error while Filter Blogs" })
    }
}




export const filteredByAuthor = async (req, res) => {
    try {
        const page = 1;
        const author = req.query.author;
        const user = await userModel.findOne({ UserName: author })
        const blogs = await blogModel.find(
            { Author: user._id }
        ).select({ _id: 0, Title: 1, Contain: 1, Author: 1, createdAt: 1 }).sort({ createdAt: -1 }).skip(10 * (page - 1)).limit(10);
        return res.status(200).send({ status: true, message: "Blog Filtered Successfully", data: blogs })
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error while Filter Blogs" })
    }
}




//upload blog image
export const uploadImage = async (req, res) => {
    try {
        let file = req.files;
        if (file && file.length > 0) {
            const url = await uploadFile(file[0]);
            const data = await blogModel.findByIdAndUpdate(bId, { Photo: url }, { new: true })
            return res.status(201).send({ status: true, message: "Photo Upload SuccessFully", data })
        } else {
            return res.status(400).send({ status: false, message: "Photo Is Mandatory For Upload" });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: "Geting Error while Upload Image" })
    }
}