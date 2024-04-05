const { createRestaurant, getRestaurant, getSingleRestaurant , getRestaurantsMunuItems , deleteRestaurant,createUserRestaurantRaiting , updateRestaurant } = require("../Controlers/Restaurant")
const router = require("express").Router()

router.post('/restaurants/new', createRestaurant)
router.get('/restaurants', getRestaurant)
router.get('/restaurants/menuItems', getRestaurantsMunuItems)
router.get('/restaurants/:id', getSingleRestaurant)
router.delete('/restaurants/:id/restaurant', deleteRestaurant)
router.put('/restaurant/:id/raiting', createUserRestaurantRaiting)
router.put('/restaurant', updateRestaurant)

module.exports = router 