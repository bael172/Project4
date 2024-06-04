const {Para,Prepod,Predmet} = require('../db/modals')
const ApiError = require('../apiError')
const {Op} = require("sequelize")

class Queries{
    async fillForeignKey(req,res,next){
        const {id_predmeta,id_prepoda} = req.body
        const found = await Para.findAll({
            where:{
                [Op.and]:[
                    {id_prepoda : id_prepoda},
                    {id_predmeta : id_predmeta}
                ]
            }
        })
        if(found.length==0){
            //try{
                const prepod = await Prepod.findByPk(req.body.id_prepoda)
                const predmet = await Predmet.findByPk(req.body.id_predmeta)

                const para = await Para.create({
                    id_prepoda, id_predmeta
                })
                res.json({message:"Запись успешна добавлена!"})
            //}
            //catch(e){
                //return next(ApiError.internal("Не удалось создать запись"))
            //}
        }
        else return next(ApiError.badRequest(("Такая запись уже есть")))
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
        res.write(found)
        if(found){
            try{
                const del = await Para.destroy({
                    where:{
                        id_pary : req.params.id
                    }
                })
                if(del[0]>0) res.write(`Удалено ${del[0]} записи`)
                else res.write("Записей для удаления не найдено")
                res.end()
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
            if(parseInt(del[0])>0) res.json({message:`Удалено ${del[0]} записей`})
            else res.json({message:"Записи не удалены"})
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
            if(got) res.send(got)
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