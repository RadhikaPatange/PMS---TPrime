const express = require('express');
const mongoose = require('mongoose');
const app = express()
const PORT = 5000;
const Router = require('./Routes/userRouter')
const pDetailsRouter = require('./Routes/pDetailsRouter')
const cors = require('cors')
const bodyParser = require("body-parser")
const dashboardRoutes = require('./Routes/dashboardRoutes')
const dashChart = require('./Routes/dashChart')

app.use(express.json());

const corsOption = {
    origin:'http://localhost:3000',
    // methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    // Credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOption));

app.use(bodyParser.json())

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

try {
    mongoose.connect('mongodb://localhost:27017/TechPrimeLab')
    console.log('MongoDB Connected sucessfully');
} catch (error) {
    console.log(`MongoDB Connected sucessfully ${error}`);
}

app.use('/api', Router)
app.use('/api', pDetailsRouter)
app.use('/api',dashboardRoutes)
app.use('/api',dashChart)


app.listen(PORT ,() => {
    console.log(`server is listing on ${PORT}`);
});

