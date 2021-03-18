import mongoose from "mongoose"

const connectDB =async()=>{
    try{
		//const MONGO_URI= "mongodb+srv://admin:passwordadmin@cluster0.5vqng.mongodb.net/test?retryWrites=true&w=majority"
        const conn = await mongoose.connect("mongodb+srv://admin:passwordadmin@cluster0.5vqng.mongodb.net/test?retryWrites=true&w=majority",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    }catch(error){
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB