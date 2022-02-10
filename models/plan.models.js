const mysqlConnection = require('../config/mysql')



const createNewPlan = async (data) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query({
            sql: `INSERT into plan(name,amount,,interval) VALUES(?,?,?)`,
            values: [data.name, data.amount, data.interval, ]
        }
            , (err, results, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
    })
    
}


const updatePlan =   async (data) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `update plan set name=?, amount=?,interval=?, where sn=?`,
            values: [data.name, data.amount, data.interval, data.sn]
        }
         ,  (err, results, fields) => {
             if (err) {
               reject(err);
             }
             resolve(results);
         })
      })
 

}




module.exports = {
    createNewPlan,
    updatePlan
}