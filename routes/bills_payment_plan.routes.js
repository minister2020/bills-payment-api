const express = require('express')
const router = express.Router()
const planController = require('../controllers/bills_payment_plan.controllers')


router.post('/plan/create', planController.createPlan)
router.get('/bills-plan/plan', planController.listPlan)
router.get('/bills_plan/plan/:id' , planController.fetchPlan)
router.put('/plan/update', planController.createPlan)





module.exports = router