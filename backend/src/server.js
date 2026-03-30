const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');              
const { Server } = require('socket.io');   

const { PORT } = require('./config/serverConfig');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);    


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log(" Socket connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(`user_${userId}`);
    console.log(` User ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    console.log(" Socket disconnected:", socket.id);
  });
});

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api/v1', routes);


server.listen(PORT, () => {
  console.log(` Server + Socket.IO running on port ${PORT}`);
});
