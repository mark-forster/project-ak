const { Server } =require ("socket.io");
const http= require("http");
const express= require("express");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST","PUT","DELETE"],
	},
});
const userSocketMap={}; //userId : socket Id
io.on("connection", (socket)=>{
    console.log(`user connected: ${socket.id}`);
  socket.on("disconnect", () => {
        console.log(`user disconnected: ${socket.id}`);
        delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
})

module.exports = { io, server, app };