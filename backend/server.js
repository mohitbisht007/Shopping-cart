import app from "./app.js";
import dotenv from 'dotenv';
import ConnectDB from "./src/config/db.js";

dotenv.config();
ConnectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App Server is running on Port ${PORT}`)
})