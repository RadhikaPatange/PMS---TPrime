const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : false
    },
    projectName: {
        type: String,
        required: true
    },
    Reason: {
        type: String,
        enum: ["Business", "Personal", "Dealership", "Transport"],
        default: "Business",
        required: true
    },
    category: {
        type: String,
        enum: ["Quality A", "Quality B", "Quality C", "Quality D",],
        default: "Quality A",
        required: false
    },
    type: {
        type: String,
        enum: ["Internal", "External", "Vendor"],
        default: "Internal",
        required: false
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "High",
        required: false
    },
    division: {
        type: String,
        required: false
    },
    department: {
        type: String,
        enum: ["Strategy", "Finance", "Quality", "Maintainance", "Stores","HR"],
        default: "Strategy",
        required: false
    },
    location: {
        type: String,
        enum: ["Pune", "Delhi", "Mumbai"],
        default: "Pune",
        required: false
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    Status : {
        type : String,
        enum: ["Registered","Running", "Cancelled", "Closed"],
        default : "Registered",
        required: false
    }
});

module.exports = mongoose.model('pDetail', projectSchema);
