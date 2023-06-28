const { createProduct , readProduct ,deleteProduct ,updateProduct ,getSingleProduct} = require("../Controlers/Product");
const { checkUser } = require("../MIiddlewares/AuthMIddleware");

const router=require("express").Router();

// Product routes
router.get("/getAllProducts",readProduct)
router.get('/getSingleProduct/:id',getSingleProduct)
// router.use(checkUser)  
router.post('/newProduct',createProduct)
router.delete('/deleteProduct/:id',deleteProduct)
router.put('/updateProduct',updateProduct)
 
 
module.exports=router;




