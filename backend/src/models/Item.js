const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name : {type:String,required:true,trim:true},
    category : {type:String, required:true,enum:['Laptop','Phone','Electronics','Wallet','Valuables','Others']},
    location : {type:String, required:true},
    date : {type:Date,required:true,default:Date.now},
    contact : {type:Number,required:true},
    email : {type:String,required:true,lowercase:true},
    image : {type:String,default:'/default.jpg'},
    status : {type:String,enum:['Lost','Found','Resolved'],default:'Lost'},
    uploadedBy : {type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    createdAt: { type: Date, default: Date.now }
},{timestamps:true}
);

module.exports = mongoose.model('Item',itemSchema);