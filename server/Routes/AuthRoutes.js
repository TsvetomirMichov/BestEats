const { register, login,refresh,loguout,getAllUsers,deleteUser,updateUser} = require("../Controlers/Auth");
const { checkUser } = require("../MIiddlewares/AuthMIddleware");

const router=require("express").Router();

router.post('/register',register)
router.post('/login',login)
router.get('/refresh',refresh)
router.post('/logout',loguout)

router.get("/getAllUsers",getAllUsers)
router.delete('/deleteUser/:id',deleteUser)
router.put('/updateUser/:id',updateUser)

module.exports=router;




