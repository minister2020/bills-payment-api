require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const planResponse= require('../services/bills_payment_plan.services')
const planModel = require('../models/plan.models')
const msgClass = require('../errors/error')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')
const planService = require('../services/bills_payment_plan.services')






const createPlan = async (req, res) => {

   let {name, amount, interval} = req.body
//console.log("here: " ,(req.body))


    const planSchema = Joi.object({
        name: Joi.string().required(),
        amount: Joi.string().required(),
        interval: Joi.string().valid( 'daily','weekly', 'monthly', 'biannually', 'annually').required()
     
    })

  //  console.log("node got here1")
    const responseFromJoiValidation = planSchema.validate({
        "name": "data",
        "amount": "1000",
        "interval": "monthly"})
    //console.log("node got here2", responseFromJoiValidation)
        if (responseFromJoiValidation.error) {
            throw new Error("Bad request")
        }
    
        
    try{
        
         const [err, createNewPlanResponse] = await doSomeAsyncMagik(planResponse.createNewPlan(req.body))
             if(err){
                throw new Error("Internal Error") 
            
            }
            if (createNewPlanResponse.data.status == false) {
                throw new Error("Sorry, plan cannot be created this moment")
                 
             }
            res.status(200).send({
                status: true,
                message: "plan successfully created",
                data: createNewPlanResponse.data.data
            })
    }
        catch(err) {
           
            res.status(400).send({
                status: false,
                message:  "ERROR"
    
         })
        }
}


    


    const listPlan = async (req, res) => {
        let { perPage, page } = req.query
         perPage = req.query.perPage || 50
         page = req.query.page || 1
        
            
  try{
     const[err, listAllPlan ] = await doSomeAsyncMagik(planService.getListPlan(req.query))
    // console.log('am here', listAllPlan)
     if(err){
         throw new Error('sorry this is on us')
     }
        
    if (listAllPlan.data.status != true) {
        throw new Error("Sorry, plan cannot be fetch ")
            
        }

    res.status(200).send({
    status: true,
    message: listAllPlan.data.message,
    data: listAllPlan.data.data
    })
    }
    catch(err) {

    res.status(400).send({
        status: false,
        message:  err.message
        

    })
    }
}

const fetchPlan = async (req, res) => {
    const { id } = req.params
    
        
            
  try{
     const fetchAllPlan = await planService.getFetchPlan( id )

        
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
    const { id } = req.params
//console.log("here: ", req.body)

    const planSchema = Joi.object({
        name: Joi.string().required(),
        amount: Joi.string().required(),
        interval: Joi.string().valid( "daily","weekly", "monthly", "biannually","annually").required()
     
    })
    
        const responseFromJoiValidation = planSchema.validate({
            "name": "data",
            "amount": "1000",
            "interval": "monthly"})
            if (responseFromJoiValidation.error) {
             
                throw new Error("Bad request")
            }

          try{  
            const [err, planResponse ] = await doSomeAsyncMagik( planService.updatePaymentPlan(req.body, req.params))
         console.log('here', planResponse)
            if(err){
               throw new Error('sorry, we will fix this')
           }
               
            if (planResponse.data.status == false) {
               throw new Error("Sorry, plan cannot be updated ")
                 
             }

        res.status(200).send({
            status: true,
            message: "plan successfully updated",
            data: planResponse.data.data
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