const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const app = express();
const cors=require ('cors');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const path = require('path');


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

const routes = require('./routes');
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/v1', routes); 
app.listen(PORT, async () => {
  console.log(`Server started on Port: ${PORT}`);
});
