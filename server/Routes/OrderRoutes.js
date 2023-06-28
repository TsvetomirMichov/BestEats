const { createOrder ,getAllOrders,updateOrder} = require("../Controlers/Orders");
const { checkUser } = require("../MIiddlewares/AuthMIddleware");

const router=require("express").Router();

// router.use(checkUser)
router.post('/createOrder',createOrder)
router.get("/getAllOrders",getAllOrders)
router.put('/updateOrder/:id',updateOrder)
// router.delete('/deleteProduct/:id',deleteTodo)
 
 
module.exports=router;




