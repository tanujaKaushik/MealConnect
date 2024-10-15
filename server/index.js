const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoute = require("./routes/messagesRoute");
const socket = require("socket.io");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("Connected to the database successfully");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }
// connectToMongo();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err.message);
})

app.use("/api/auth",userRoutes);
app.use("/api/messages",messagesRoute);

const server = app.listen(process.env.PORT, () =>{
    console.log( `Server is running on port ${process.env.PORT}`);
});

const io = socket(server, {
    cors:{
        origin:"http://localhost:3000",
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        // console.log(data);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.msg);
        }
    });
})