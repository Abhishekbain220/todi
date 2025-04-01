require("dotenv").config()
let db=require("./model/connect")
let express=require("express")
let cookieParser=require("cookie-parser")
let morgan=require("morgan")
let cors=require("cors")
const { errorHandler } = require("./middleware/errorHandler")
let PORT=process.env.PORT || 3000
let app=express()
let userRouter=require("./Routes/userRouter")
let taskRouter=require("./Routes/taskRouter")
let path=require("path")

let _dirname=path.resolve()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan("tiny"))
app.use(cors({
    origin:true,
    credentials:true
}))

// Routes
app.use("/user",userRouter)
app.use("/task",taskRouter)

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.use("*",(req,res,next)=>{
    let error=new Error("Route not found")
    error.status=404
    next(error)
})

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log("Server running on PORT",PORT)
})