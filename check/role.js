const jwt = require('jsonwebtoken')
const {Prepod} = require('../db/modals')

module.exports = function(req,res,next) {
        if(req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message:"Не авторизован, отсутствует токен"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        //decoded = User
        if(decoded.role!=="admin" && decoded.role!=="mod"){
            return res.status(403).json({message:"У вас нет доступа к данной операции"})
        }
        if(decoded.role =="guest"){
            return res.status(403).json({message:"Авторизируйтесь чтобы получить доступ"})
        }
        req.user = decoded
        next()
    }
    catch(e) {
        res.status(401).json({message:"Не авторизован: другая причина"})
    }
}
