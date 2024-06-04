const express = require("express")
require('dotenv').config()
const cors = require('cors')

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())

const sequelize = require("./db/connect")

const modals = require('./db/modals')

const router = require('./routes/index')

app.use('/api',router)

app.get('/msg',(req,res)=>{
    res.status(200).json({message:"Working"})
})

async function start(){
    try{
        await sequelize.authenticate()
        await sequelize.sync({force:false})
        app.listen(port, ()=>{
            console.log(`Server starts on ${port} port`)
        })
    }
    catch(e){
        console.error('Unable to connect to the database')
    }
}
start()
      /*  let promise = new Promise(function(resolve,reject){
            console.log(found)
            setTimeout(()=>resolve("done"),1000)
        })
        */
