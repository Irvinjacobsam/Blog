import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import loginSchema from "../models/signup.schema.js";

// import fileSchema from "../models/upload.schema.js";

import blogSchema from "../models/blog.schema.js";



const { sign } = jwt;

export async function signup(req, res) {
    try {
        let { username, password } = req.body;
        console.log(username, password);
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = await loginSchema.findOne({ username });
        if (user) {
            return res.status(400).send("User already exist");
        }
        let result = await loginSchema.create({
            username,
            password: hashedPassword,
        });
        res.json("Successfully registerd");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error occured");
    }
}

export async function signin(req, res) {
    try {
        let { username, password } = req.body;
        let user = await loginSchema.findOne({ username });
        if (!user) {
            return res.status(400).send("Incorrect username or password!");
        }
        let passMatch = await bcrypt.compare(password,user.password);
        if(passMatch) {
            let token = await sign({
                userId: user._id,
                username: user.username
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "24h"
            });
            return res.json({
                msg: "Login successful",
                token: token
            })
        }
        return res.status(400).send("Invalid username or password!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error occured");
    }
}


export async function addblog(req, res) {
    try {
        let { blogimg, Title, content } = req.body;
        console.log(req.body);
        // console.log(Mvname, lang, category , poster);
        let title = await blogSchema.findOne({ Title });

        if (title) {
            return res.status(400).send("Blog already exists");
        }


        let result = await blogSchema.create({
            Title,
            content,
            blogimg
        });
        res.json("succesfully added")
    } catch (error) {
        console.log(error);
        res.status(500).send("error occured")

    }
}

export async function printblog(req,res){

    try {

        let result = await blogSchema.find();
        res.json(result);

        }
        
    catch (error) {
        console.log(error);
        res.status(500).send("error occured")
        
    }

}