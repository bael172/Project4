const {Para} = require('../db/modals')
const ApiError = require('../apiError')
const {Op} = require("sequelize")

class Queries{
    async add(req,res,next){
        const {id_predmeta,id_prepoda} = req.body
        const found = await Para.findAll({
            where:{
                [Op.and]:[
                    {prepodIdPrepoda : id_prepoda},
                    {predmetIdPredmeta : id_predmeta}
                ]
            }
        })
        if(found.length==0){
            try{
                const create = await Para.create({
                    id_predmeta, id_prepoda
                })
                res.send(create)
            }
            catch(e){
                return next(ApiError.internal("Не удалось создать запись"))
            }
        }
        else return next(ApiError.badRequest(("Повторное введение записи")))
    }
    async edit(req,res,next){
        const {id_predmeta, id_prepoda} = req.body
        const found = await Para.findAll({
            where:{
                id_pary : req.params.id
            } 
        })
        console.log("Найден массив found? ",Array.isArray(found))
        const found_id = found[0].dataValues.id_pary
        if(Object.keys(found[0]).length!==0){
            try{
                await Para.update(
                    {id_predmeta, id_prepoda},{
                    where:{
                        id_pary : found_id
                    }
                })  
                const upd = await Para.findOne({
                    where:{id_pary : found_id}
                })
                res.send(upd)
            }
            catch(e){
                return next(ApiError.internal("Не удалось обновить запись"))
            }
        }
        else return next(ApiError.badRequest(`Запись с id=${req.params.id} нет`))
    }
    async del_by_id(req,res,next){
        const found = await Para.findAll({
            where:{
                id_pary : req.params.id
            }
        })
        const found_id = found[0].dataValues.id_pary
        if(Object.keys(found[0]).length!==0){
            try{
                const del = await Para.destroy({
                    where:{
                        id_pary : found_id
                    }
                })
                del.then(value=>{
                    res.write(value)
                    if(value=="fulfilled")res.write("\nЗапись удалена")
                    res.end()
                })
            }
            catch(e){
                return next(ApiError.internal("Не удалось удалить запись"))
            }
        }
        else return next(ApiError.badRequest(`Нет записей с id=${req.params.id}`))
    }
    async del_all(req,res,next){
        try{
            const del = await Para.destroy({
                truncate:true
            })
            del.then(value=>{
                res.write(value)
                if(value=="fulfilled") res.write("Таблица Пары опустошена")
                res.end()
            })
        }
        catch(e){
            return next(ApiError.internal("Не удалось опустошить таблицу"))
        }
    }
    async get_by_id(req,res,next){
        try{
            const got = await Para.findOne({
                where:{id_pary : req.params.id}
            })
            if(Object.keys(got)!==0) res.send(got)
            else res.send(`Нет записи с id=${req.params.id}`)
            
        }
        catch(e){
            return next(ApiError.internal("Не удалось вернуть записи"))
        }
    }
    async get_all(req,res,next){
        try{
            const got = await Para.findAll({})
            res.send(got)
        }
        catch(e){
            return next(ApiError.internal("Ошибка"))
        }
    }
}

module.exports = new Queries()