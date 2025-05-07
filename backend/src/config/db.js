import mongoose from "mongoose"

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("MongoDB Connected")
  } catch (error) {
    console.log(error)
  }
}
export default ConnectDB