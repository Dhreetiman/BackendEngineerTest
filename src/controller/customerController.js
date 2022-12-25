const customerModel = require('../model/customerModel');
const validator = require('../validator/validator');
const {v1: uuidv1} = require('uuid');



//================[function to create customer data]===================//

const createCustomer = async (req, res) => {
    try {

        let data = req.body
        let {firstName, lastName, mobileNumber, DOB, emailID, address, customerID, status, ...rest} = data

        if(!validator.checkInput(data)) return res.status(400).send({status: false, message: "Body cannot be empty, please provide mandatory inputs (i.e. firstName, lastName, mobileNumber, DOB, emailID, address, customerID, status"})
        if (validator.checkInput(rest)) return res.status(400).send({status: false, message: "only 'firstName, lastName, mobileNumber, DOB, emailID, address, customerID, status' are accepts"})

        if (!validator.isValidInput(firstName)) return res.status(400).send({status: false, message: 'Please enter first name'})
        if (!validator.isValidName(firstName)) return res.status(400).send({status: false, message: 'INVALID INPUT... Please provide valid first name'})

        if (!validator.isValidInput(lastName)) return res.status(400).send({status: false, message: 'Please enter last name'})
        if (!validator.isValidName(lastName)) return res.status(400).send({status: false, message: 'INVALID INPUT... Please provide valid last name'})

        if (!validator.isValidInput(mobileNumber)) return res.status(400).send({status: false, message: 'Please enter mobile number'})
        if (!validator.isValidMobileNumber(mobileNumber)) return res.status(400).send({status: false, message: `INVALID INPUT... Given mobileNumber: '${mobileNumber}' is not valid`})

        if (!validator.checkInput(DOB)) return res.status(400).send({status: false, message: 'Please enter emailID'})
        if (!validator.isValidDOB(DOB)) return res.status(400).send({status: false, message: 'Invalid DOB format, DOB should be in YYYY-MM-DD format'})

        if (!validator.checkInput(emailID)) return res.status(400).send({status: false, message: 'Please enter emailID'})
        if (!validator.isValidEmail(emailID)) return res.status(400).send({status: false, message: `INVALID INPUT... Given email: '${emailID}' is not valid`})
        
        let checkData = await customerModel.findOne({$or: [{mobileNumber: mobileNumber},{emailID: emailID}]});
        if (checkData){
            if (checkData.mobileNumber==mobileNumber) return res.status(409).send({status: false, message: `given mobileNumbe: '${mobileNumber}' already exist, please try different mobile number`})
            if (checkData.emailID==emailID) return res.status(409).send({status: false, message: `given emailID: '${emailID}' already exist, please try different emailID`})
        }

        if (!validator.isValidInput(address)) return res.status(400).send({status: false, message: "plaese enter address"})
        if (!validator.isValidCity(address)) return res.status(400).send({status: false, message: "INVALID INPUT... plaese enter valid address"})

        data.customerID = 'FunctionUp-'+uuidv1()
        // console.log(data.customerID);

        if (status || status == '') {
            if (!validator.isValidInput(status)) return res.status(400).send({status: false, message: "plaese enter status"})
            if (!["ACTIVE", "INACTIVE"].includes(status)) return res.status(400).send({status: false, message: "choose input for status from the list: (ACTIVE, INACTIVE)"})
        }


        let customerData = await customerModel.create(data)
        return res.status(201).send({status: true, message: "Data created successfully", data: customerData})
    


    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
}


//=====================[Function to fetch customer Data]=======================//


const getCustomer = async (req, res) => {
    try {

        let getData = await customerModel.find({status:'ACTIVE'})
        if (!getData) return res.status(404).send({status: false, message: "something went wrong"})
        return res.status(200).send({status: true, message: 'success',totalData: getData.length, data: getData})
        
    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
}


//=====================[Function to Delete customer's data]===============//

const deleteCustomer = async (req, res) => {
    try {
        
        let id = req.params.customerID
        if (!validator.isValidObjectId(id)) return res.status(400).send({status: false, message: `Given customerID: '${id}' is not valid`})
        let deleteData = await customerModel.findByIdAndDelete({_id: id})
        if (!deleteData) return res.status(404).send({status: false, message: "Customer does not exist or already Deleted"})
        return res.status(200).send({status: true, message: " Data Deleted Successfully"})

    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
}



module.exports = {createCustomer, getCustomer, deleteCustomer}