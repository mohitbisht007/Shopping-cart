import express from "express"
const app = express();
import productRoutes from "./src/routes/productRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js"
import cors from 'cors'

app.use(cors({
    origin: 'http://localhost:5173',
  }));

app.use(express.json())

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get ("/", (req, res) => {
    res.send("Server is Running On Port")
})

export default app;