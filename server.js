const express = require('express')

const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/connectDB');
const path = require('path')
dotenv.config();


//database call
connectDB()
//rest object
const app = express();

//middlewares 
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes
//userroutes
app.use('/api/v1/user', require('./routes/userRoute'))
//transactionroutes
app.use('/api/v1/transactions', require('./routes/transactionRoutes'))
//static files
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
//port

const PORT = 8080 || process.env.PORT


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT} `)
})