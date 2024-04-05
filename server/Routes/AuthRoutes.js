const { register, login,refresh,loguout,getAllUsers,deleteUser,updateUser , getSingleUser} = require("../Controlers/Auth");
const {verifyToken}=require('../MIiddlewares/AuthMIddleware')
const router=require("express").Router();

router.post('/register',register)
router.post('/login',login)
router.get('/refresh',refresh)
router.post('/logout',loguout)

router.get("/getAllUsers",getAllUsers)
router.get("/getSingleUser",getSingleUser)
router.delete('/deleteUser/:id',verifyToken,deleteUser)
router.put('/updateUser/:id',verifyToken,updateUser)

module.exports=router;




