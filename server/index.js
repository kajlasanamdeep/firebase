const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyparser = require('body-parser');
const routes = require('./routes')
const cors = require('cors');
const { response } = require('express');

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({origin:true}));
app.use('/admin',routes.AdminRoutes);
app.use('/user', routes.UserRoutes);

server.listen(8000,()=>{
    console.log('App is running at http://localhost:8000/');
})