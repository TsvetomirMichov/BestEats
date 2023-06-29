const express = require('express')
const AuthRoutes=require("./Routes/AuthRoutes")
const OrderRoutes=require("./Routes/OrderRoutes")
const ProductRoute=require("./Routes/ProductRoutes")
const cors = require('cors') 
const app = express(); 
const mongoose=require('mongoose');
var multer  = require('multer')
const path = require("path")
const cookieParser=require('cookie-parser');
// We use [ Credentials ]  To enable HTTP cookies over CORS
app.use(
  cors({
    origin: ["http://127.0.0.1:3000/"],
    methods: ["GET", "POST","DELETE","PUT"],
    credentials: true,
  })
);

const dbURL=process.env.MONGO_URI;
//Importing bcrypt for more securyty of the password with hashing

mongoose.connect(dbURL,{useNewUrlParser:true , useUnifiedTopology:true}).then((result)=>{
  console.log('connected to db')
}).catch((error)=>{
  console.log({err:error})
})

const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "./images") 
  },
  filename: (req, file, callb) => {
    //callb(null, "file.png")
    callb(null,req.body.name );
   },
})
//app.use("/upload",express.static("upload"));
app.use("/images", express.static(path.join(__dirname, "images")))

const upload = multer({ storage: storage })
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded")
})
app.use(cookieParser())
// We use json to resive json data from the body of the frontend and parse it to JSON format the backend
app.use(express.json())
app.use("/",AuthRoutes,OrderRoutes,ProductRoute)

app.listen(1337, () => {
  console.log(`running on port 1337`);
})