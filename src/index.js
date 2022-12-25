const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const router = require('./routes/route')
const app = express()

app.use(express.json())
app.use(multer().any())

app.use('/',router)
mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://Lucifer:lucifer123@newcluster.v5hebkq.mongodb.net/newDataBase?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(()=> console.log('MongoDB connected'))
.catch((err)=>console.log(err))

app.listen(9000, ()=>{
    console.log('express is running on port ', 9000)
})