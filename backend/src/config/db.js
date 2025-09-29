import mongooose from "mongoose"

const connectDB = async () =>{
    console.log("Connecting to MongoDB....... ")
    try{
       const conn = await mongooose.connect(process.env.MONGO_URI);
       console.log(`MongoDB Connected Successfully !!`)
    }catch(err){
       console.log("MongoDB Connection error : ",err.message)
       process.exit(1);
    }
}

export default connectDB;