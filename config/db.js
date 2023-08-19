const env = require("../.env")
const mongoose = require("mongoose")

const conn = async ()=>{
    try {
        const dbconn = await mongoose.connect(env.dbString)    
        console.log("Conectou ao Banco")
        return dbconn
    } catch (error) {
        console.log(error)
    }
}

conn()

module.exports = conn