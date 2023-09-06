const catchAsyncError = require('../middlewares/catchAsyncError');
const Attendence=require('../models/attendence_model');
const mongoose=require('mongoose');
const ErrorHandler = require('../utils/ErrorHandler');


const markAttendence=catchAsyncError(async(req,res,next)=>{
    const findAttendence=await Attendence.findOne({ subject:req.query.subject,student:req.query.student,date:{$gt:new Date(new Date().getTime()-0.1*60*60*1000)}});
    if(!findAttendence){
        const addAttendence= await Attendence.create({
            teacher:req.teacher._id,
            subject:req.query.subject,
            student:req.query.student
        })
    
        const getAttendence=await Attendence.findOne({ subject:req.query.subject,student:req.query.student,date:{$gte:new Date(new Date().getTime()-0.1*60*60*1000)}});
    
        if(getAttendence){
           res.json({
            getAttendence
           })
        }else{
            return next(new ErrorHandler("someting wrong",404));
        }
    }else{
        res.send("already marked");
    }
   
   
})

const findAttendence=catchAsyncError(async(req,res,next)=>{
    const filter=[];

    if(req.query.upperlimit){
        filter.push({date:{$lte:new Date(req.query.upperlimit)}});
    }
    if(req.query.lowerlimit){
        filter.push({date:{$gte:new Date(req.query.lowerlimit)}});
    }

    filter.push({teacher:req.teacher._id})

    if(req.query.subject){
        filter.push({subject: new mongoose.Types.ObjectId(req.query.subject)});
    }
    if(req.query.student){
        filter.push({student:new mongoose.Types.ObjectId(req.query.student)});
    }

    let attendence=await Attendence.aggregate([
        {
          $match:{$and:filter}
        },
        {
            $lookup:{from:"students", localField:"student",foreignField:"_id",as:"students"}
        },
        { 
            $group: {_id:"$subject",items:{$push:"$$ROOT"}}
        }
]);
if(attendence){
res.json({
    attendence
});
}else{
    return next(new ErrorHandler("some id is wrong or date ",404));
}
   
})

module.exports={markAttendence,findAttendence};