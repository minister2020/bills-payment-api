require('dotenv').config()
const axios = require('axios').default




const createNewPlan = async (data) =>{
    
    return axios({
        method: "post",
        url: `${process.env.PAYSTACK_BASE_URL}/plan`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data: {
            "name": data.name,
            "amount": data.amount,
            "interval": data.interval
          
        }
    })
}

const getListPlan = async (data)=>{

    return axios({
        method: "get",
        url: `${process.env.PAYSTACK_BASE_URL}/plan?perPage=${data.perPage}&page=${data.page}`,
        headers: {
            
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },


})

}
const getFetchPlan = async (id )=>{

    return axios({
        method: "get",
        url: `${process.env.PAYSTACK_BASE_URL}/plan/:id`,
        headers: {
            
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },


})

}


const updatePaymentPlan = async (data, id) =>{
    
    return axios({
        method: "put",
        url: `${process.env.PAYSTACK_BASE_URL}/plan/id`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        data: {
            "name": data.name,
            "amount": parseFloat(data.amount),
            "interval": data.interval
          
        },
        
    })
}

module.exports = {
    createNewPlan,
    getListPlan,
    getFetchPlan,
    updatePaymentPlan
}