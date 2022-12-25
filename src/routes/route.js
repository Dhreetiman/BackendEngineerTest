const express = require('express')

const router = express.Router()

const {createCustomer, getCustomer, getDataById, deleteCustomer} = require('../controller/customerController')
const {createCard, getCard} = require('../controller/cardController')


router.post('/register', createCustomer)

router.get('/customers', getCustomer)

router.get('/customers/:customerID', getDataById)

router.delete('/customers/:customerID', deleteCustomer)

router.post('/cards', createCard)

router.get('/cards', getCard)




router.all("/**",  (req, res) => {
    return res.status(404).send({ status: false, msg: "Requested path does not exist, Check your URL"})
});



module.exports = router