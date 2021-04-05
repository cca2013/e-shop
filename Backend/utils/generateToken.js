import jwt from "jsonwebtoken"

const generateToken = (id) =>{
    return jwt.sign({id}, 'EK6VrjifHcbhtQeskfMHuKWB77rHQ2YlluJwIs6n6SlpsIdLCyEA_aUbtIXDMxnyzHAj4KIAAmlKjq0F', {expiresIn:"30d"})
}

export default generateToken