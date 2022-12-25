const express = require('express')

const router = express.Router()

const {createCustomer, getCustomer, deleteCustomer} = require('../controller/customerController')


router.post('/register', createCustomer)

router.get('/customers', getCustomer)

router.delete('/customers/:customerID', deleteCustomer)




router.all("/**",  (req, res) => {
    return res.status(404).send({ status: false, msg: "Requested path does not exist, Check your URL"})
});



module.exports = router