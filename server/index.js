const express = require("express")
const app = express()

const userRouter = require("./routes/User");
const profileRouter = require("./routes/Profile");
const paymentRouter = require("./routes/Payments");
const courseRouter = require("./routes/Course");
const reachRouter = require("./routes/Contact")

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} =require("./config/cloudinary");
const fileUplode = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT  = process.env.PORT || 4000;

database.connect()
cloudinaryConnect()

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.originPath, 
        credentials: true,
    })
);

app.use(
    fileUplode({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

app.use("/api/v1/auth",userRouter);
app.use("/api/v1/profile",profileRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/payment",paymentRouter);
app.use("/api/v1/reach",reachRouter);

app.get("/",(req,res)=>{
        return res.json({
            success:true,
            message:'Your Server Is Up And Running....'
        })
})

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}...`);
})