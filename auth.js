import jwt from "jsonwebtoken";

const { verify } = jwt;

export default function auth(req, res, next) {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let user = verify(token, process.env.SECRET_KEY);
        if(user) {
            console.log("Authorized");
            req.user = user;
            next();
            return;
        }
        return res.status(401).send("Unauthorized access...");
    } catch (error) {
        console.log(error);
        return res.status(401).send("Unauthorized access...");
    }
}