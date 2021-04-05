import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
const JWT_SECRET="EK6VrjifHcbhtQeskfMHuKWB77rHQ2YlluJwIs6n6SlpsIdLCyEA_aUbtIXDMxnyzHAj4KIAAmlKjq0F";
const Protect = async (req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
			jwt.sign();
            token= req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,JWT_SECRET)
            req.user = await User.findById(decoded.id).select("password")
            next()
        } catch (error) {
            console.error(error)
             return res.status(401).send("Sorry pal: access denied");
            throw new Error("not authorized, token failed")
        }
    }
    
    if(!token){
        return res.status(401);
        throw new Error("Not authorized, no token")
    }

}

const Admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(404)
        throw new Error("Only Admin is Authorized")
    }
}

export {Protect, Admin}