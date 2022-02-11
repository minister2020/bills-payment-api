require('dotenv').config()
const axios = require('axios').default




const createPlanCategories = async (data) =>{
    
    return axios({
        method: "post",
        url: `${process.env.PAYSTACK_BASE_URL}/plan`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data: {
            "name": data.name,
            "amount": parseFloat(data.amount) * 100,
            "interval": data.interval
          
        }
    })
}

const getListPlan = async (perPage, page)=>{

    return axios({
        method: "get",
        url: `${process.env.PAYSTACK_BASE_URL}/plan?perPage=${perPage}&page=${page}`,
        headers: {
            
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },


})

}
const getFetchPlan = async (id )=>{

    return axios({
        method: "get",
        url: `${process.env.PAYSTACK_BASE_URL}/plan/id`,
        headers: {
            
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },


})

}


const updatePaymentPlan = async (data) =>{
    
    return axios({
        method: "post",
        url: `${process.env.PAYSTACK_BASE_URL}/plan/id`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data: {
            "name": data.name,
            "amount": parseFloat(data.amount) * 100,
            "interval": data.interval
          
        }
    })
}

module.exports = {
    createPlanCategories,
    getListPlan,
    getFetchPlan,
    updatePaymentPlan
}