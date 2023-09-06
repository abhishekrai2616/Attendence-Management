const Subject=require('../models/subject_model');
const catchAsyncError=require('../middlewares/catchAsyncError');
const ErrorHandler=require('../utils/ErrorHandler');
const User=require('../models/user_model');

const addSubject=catchAsyncError(async(req,res,next)=>{
    const teacherid=await User.findOne({userid:req.body.teacher});
    if(teacherid){
    const subject= await Subject.create({
        subjectid:req.body.subjectid,
        name:req.body.name,
        teacher:teacherid._id
    })

    const findSubject=await Subject.findOne({subjectid:req.body.subjectid});

    if(findSubject){
        res.json({
            findSubject
        })
    }else{
        return next(new ErrorHandler("something wrong with the subject",404));
    }

    }else{
        return next(new ErrorHandler("something wrong with the subject",404));
    }

})

const removeSubject=catchAsyncError(async (req,res,next)=>{
    const findSubject=await Subject.findOne({subjectid:req.query.subjectid});
    if(findSubject){
        const deleteSubject=await Subject.deleteOne({subjectid:req.query.subjectid});

        res.json({
            deleteSubject
        })

    }else{
        return next(new ErrorHandler("no such document",404));
    }
})

const subjectList=catchAsyncError(async (req,res,next) =>{
    const findSubject=await Subject.find();
    res.json({findSubject});
})

const UpdateSubject=catchAsyncError(async(req,res,next)=>{
    const findSubject=await Subject.findOne({subjectid:req.params.subjectid});
    const findTeacher=await User.findById(req.body.teacher);
    if((findSubject.subjectId===req.body.subjectId && findSubject.name===req.body.subjectname && findSubject.teacher===req.body.teacher) || !findTeacher){
        return next(new ErrorHandler("please use this update thing responsively"));
    }
    else{
        
    }
    if(findSubject){
        res.json({
            findSubject
        })
    }else{
        return next(new ErrorHandler("something wrong with the subject",404));
    }

})

module.exports={addSubject,removeSubject,subjectList};