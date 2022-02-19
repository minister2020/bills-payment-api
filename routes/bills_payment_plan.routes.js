const express = require('express')
const router = express.Router()
const planController = require('../controllers/bills_payment_plan.controllers')


router.post('/plan', planController.createPlan)
router.get('/bills-plan/plan', planController.listPlan)
router.get('/bills_fetch/plan' , planController.fetchPlan)
router.put('/plan/update/:id', planController.updatePlan)





module.exports = router