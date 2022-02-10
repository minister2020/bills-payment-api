require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const planService = require('../services/bills_payment_plan.services')
const planModel = require('../models/plan.models')
const msgClass = require('../errors/error')





const createPlan = async(req, res) =>{
    const {  name, amount, interval } = req.body

    const planSchema = Joi.object({
        name: Joi.string().required(),
        amount: Joi.string().required(),
        interval: Joi.string().valid("weekly", "monthly").required()
     
    })
    try {
        const responseFromJoiValidation = planSchema.validate(req.body)
            if (responseFromJoiValidation.error) {
                console.log("i enterered here", responseFromJoiValidation.error)
                throw new Error("Bad request")
            }
            console.log("before payatsck call")
            const planResponse = await planService.createPlanCategories(req.body)
            console.log("here: ", JSON.stringify(planResponse))
               
            if (planResponse.data.status == false) {
               throw new Error("Sorry, plan cannot be creayed ")
                 
             }

        res.status(200).send({
            status: true,
            message: "plan successfully created",
            data: planResponse.data
        })
    }
        catch(e) {
           
            res.status(400).send({
                status: false,
                message:   e.message || msgClass.GeneralError
    
         })
        }
}


    


    const listPlan = async (req, res) => {
    const perPage = req.query.perPage || 50
    const page = req.query.page || 1
        
            
  try{
     const listAllPlan = await planService.getListPlan(req, res)
     console.log('am here', JSON.stringify(listAllPlan))
        
    if (listAllPlan.data.status == false) {
        throw new Error("Sorry, plan cannot be fetch ")
            
        }

    res.status(200).send({
    status: true,
    message: "plan successfully fetch",
    data: listAllPlan.data.data
    })
    }
    catch(err) {

    res.status(400).send({
        status: false,
        message:  msgClass.GeneralError ||err.message,
        data: null

    })
    }
}

const fetchPlan = async (req, res) => {
    const { id } = req.params
    
        
            
  try{
     const fetchAllPlan = await planService.getFetchPlan( id)

        
    if (fetchAllPlan.data.status == false) {
        throw new Error("Sorry, plan cannot be fetch ")
        
        }
//console.log('i got here  after paystack')
    res.status(200).send({
    status: true,
    message: "plan retrieve",
    data: fetchAllPlan.data.data
    })
    }

    catch(err) {

    res.status(400).send({
        status: false,
        message:  msgClass.GeneralError ||err.message,
        data: []

    })
    }
}




const updatePlan = async(req, res) =>{
    const {  name, amount, interval } = req.body

    const planSchema = Joi.object({
        name: Joi.string().required(),
        amount: Joi.string().required(),
        interval: Joi.string().valid( "daily","weekly", "monthly").required()
     
    })
    try {
        const responseFromJoiValidation = planSchema.validate(req.body)
            if (responseFromJoiValidation.error) {
             
                throw new Error("Bad request")
            }
            
            const planResponse = await planService.updatePaymentPlan(req.body)
           
               
            if (planResponse.data.status == false) {
               throw new Error("Sorry, plan cannot be updated ")
                 
             }

        res.status(200).send({
            status: true,
            message: "plan successfully updated",
            data: planResponse.data
        })
    }
        catch(e) {
           
            res.status(400).send({
                status: false,
                message:   e.message || msgClass.GeneralError
    
         })
        }
}

    






    module.exports = {
        createPlan,
        listPlan,
        fetchPlan,
        updatePlan

    }