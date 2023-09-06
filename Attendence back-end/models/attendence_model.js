const mongoose=require('mongoose');


const attendenceSchema=new mongoose.Schema({
    subject:{type:mongoose.Schema.Types.ObjectId,ref:"Subject"},
    teacher:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    student:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    date:{
        type:Date,
        default:new Date  
    }

})
attendenceSchema.index({"date":1});
const Attendence=new mongoose.model("Attendence",attendenceSchema);

module.exports=Attendence;