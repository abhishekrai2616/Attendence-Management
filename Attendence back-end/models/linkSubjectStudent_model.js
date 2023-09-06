const mongoose=require('mongoose');
const validator=require('validator');

const linkSubjectStudentSchema=new mongoose.Schema({
    student:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    subject:{type:mongoose.Schema.Types.ObjectId,ref:"Subject"},
    teacher:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    rollno:{
        type:String,
        require:true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("please fill it");
            }
        }
    },
    subjectid:{
        type:String,
        require:true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("please fill it");
            }
        }
    }
});


linkSubjectStudentSchema.index({"teacher":1});
const linkSubjectStudent=new mongoose.model("linkSubjectStudent",linkSubjectStudentSchema);

module.exports=linkSubjectStudent;