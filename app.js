// Entry file
const express = require("express")
const mongoose = require("mongoose")
const cors= require("cors")
require('dotenv').config()

// middleware
const app = express()
app.use(express.json())
app.use(cors())

// static files accessibility
app.use("/uploads",express.static)

// login/register routes
const userAuth = require('./routes/loginRoute')
app.use('/api/user/Auth',userAuth)

// classrooms
const classrooms = require('./routes/classroomRoutes')
app.use('/api/classrooms',classrooms)

// Teachers
const teachers = require('./routes/teacherRoutes')
app.use('/api/teachers',teachers)

// assignment
const assignment = require('./routes/assignmentRoute')
app.use('/api/assignment',assignment)

// Parents
const parent = require('./routes/parentRoute')
app.use('/api/parent',parent)

// Student
const student = require('./routes/studentRoute')
app.use('/api/student',student)

// admindash routes
const admindash = require('./routes/adminRoute')
app.use('/api/admindash',admindash)

// teacherdash routes
const teacherdash = require('./routes/teacherDashRoute')
app.use('/api/teacherdash',teacherdash)

// parentdash routes
const parentdash = require('./routes/parentDashRoute')
app.use('/api/parentdash',parentdash)

// connection to the database
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo Connected"))
.catch(err=>console.log("Mongo Connection error"))

const PORT = 3000
app.listen(PORT,()=>{
    console.log("Server running on port "+PORT+"...")
})