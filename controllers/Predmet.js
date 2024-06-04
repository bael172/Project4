const {Predmet} = require("../db/modals") 
const ApiError = require("../apiError")
const {Buffer} = require('node:buffer')

class Queries{
    async add(req,res,next){
        const {predmet,profile,course_start, course_end} = req.body
        const found = await Predmet.findAll({
            where:{
                predmet : predmet
            }
        })
        if(found.length==0){
            try{
                const add = await Predmet.create({
                    predmet, profile, course_start, course_end
                })
                res.send(add)
            }
            catch(e){
                return next(ApiError.badRequest("Не удалось создать запись"))
            }
        }
        else return next(ApiError.badRequest("Предмет с таким названием уже есть в таблице"))
    }
    async edit(req,res,next){
        const {predmet,profile,course} = req.body
        const found = await Predmet.findAll({where:{id_predmeta : req.params.id}}) 
            if(!found){
                try{
                    await Predmet.update(
                        {predmet,profile,course},{
                            where:{id_predmeta : req.params.id}
                        }
                    )
                    const upd = await Predmet.findOne({
                        where:{id_predmeta:found_id}
                    })
                    res.write(upd)
                    if(upd[0]>0) res.write(`Обновлено ${upd[0]}`)
                    else res.write("Запись не найдена для обновления")
                    res.end()
                }
                catch(e){
                    return next(ApiError.internal('Не удалось обновить запись'))
                }
            }
            else next(ApiError.badRequest(`Запись с id=${req.params.id} не найдена`))
    }
    async del_by_id(req,res,next){
        const found = await Predmet.findAll({
            where: req.params.id
        })
        if(Object.keys(found[0]).length!==0){
            try{
                const del = await Predmet.destroy({
                    where:{
                        id_predmeta : req.params.id
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
        else return next(ApiError.badRequest(`Не найдено записей с id=${req.params.id}`))
    }
    async delAll(req,res,next){
        try{
            const del = Predmet.destroy({
                truncate: true
            })
            del.then(value=>{
                res.write(value)
                if(value=="fulfilled") res.write("Таблица Предмет опустошена")
                res.end()
            })
        }
        catch(e){
            return next(ApiError.internal("Не удалось опустошить таблицу"))
        }
    }
    async get_by_id(req,res,next){
        try{
            const got = await Predmet.findOne({
                where:{id_predmeta : req.params.id}
            })
            if(Object.keys(got)!==0) res.send(found)
            else res.send("По данному id ничего не найдено")
        }
        catch(e){
            return next(ApiError.internal("Не удалось вернуть записи"))
        }

    }
    async getAll(req,res,next){
        try{
            const got = await Predmet.findAll({})
            res.send(got)
        }
        catch(e){
            return next(ApiError.internal("Ошибка"))
        }
    }
}

module.exports=new Queries()