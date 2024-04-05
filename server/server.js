require('dotenv').config()
const express = require('express')
const AuthRoutes = require("./Routes/AuthRoutes")
const OrderRoutes = require("./Routes/OrderRoutes")
const ProductRoute = require("./Routes/ProductRoutes")
const RestaurantRoute = require("./Routes/RestaurantRoutes")
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { setChache } = require("./MIiddlewares/CacheMiddleware")
// We use [ Credentials ]  To enable HTTP cookies over CORS
app.use(
  cors({
    origin: ["http://127.0.0.1:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

const dbURL = process.env.MONGO_URI;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
  console.log('connected to db')
}).catch((error) => {
  console.log({ err: error })
})

// const storage = multer.diskStorage({
//   destination: (req, file, callb) => {
//     callb(null, "./images") 
//   },
//   filename: (req, file, callb) => {
//     //callb(null, "file.png")
//     callb(null,req.body.name );
//    },
// })
// //app.use("/upload",express.static("upload"));
// app.use("/images", express.static(path.join(__dirname, "images")))

// const upload = multer({ storage: storage })
// app.post("/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("File has been uploaded")
// })

app.use(cookieParser())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb', extended: true}));
app.use("/", AuthRoutes, OrderRoutes, ProductRoute, RestaurantRoute,setChache)


// if(process.env.NODE_ENV === 'production'){
//   const __dirname=path.resolve()
//   app.use(express.static(path.join(__dirname,'../client/dist')))

//   app.get('*',(req,res)=>
//   res.sendFile(path.resolve(__dirname),'../client','dist','index.html'))
// }else{
//   app.get('/',(req,res) =>res.send("Server in running"))
// }

app.get('/', (req, res) => res.send("Server in running"))

app.listen(1337, () => {
  console.log(`running on port 1337`);
})