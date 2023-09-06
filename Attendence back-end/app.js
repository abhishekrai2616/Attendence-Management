const express=require('express')
const Teacher=require("./routes/teacher_routes");
const Subject=require("./routes/subject_routes");
const Attendence=require('./routes/attendence_routes');
const bodyParser =require('body-parser');
const app=express();
const errorMiddleware=require('./middlewares/error');
const cookieParser=require('cookie-parser');
const cors=require("cors");


app.use(cors({
    origin:"http://127.0.0.1:5173",
    credentials:true
}));
app.use(express.json({limit:'50mb'}));//with app.use it is going to be global to our entire application(middleware)
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
app.use("/Teacher",Teacher);
app.use("/Subject",Subject);
app.use("/Attendence",Attendence);
app.use(errorMiddleware);



module.exports=app;