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
      /*  let promise = new Promise(function(resolve,reject){
            console.log(found)
            setTimeout(()=>resolve("done"),1000)
        })
        */
        if(found.length==0){
            try{
                const add = Predmet.create({
                    predmet, profile, course_start, course_end
                })
                res.send("Добавлена запись в таблицу Предмет")
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
        
        console.log("Is Array?",Array.isArray(found))
        console.log("Array length?",found.length)
        console.log(found[0].dataValues.id_predmeta)

        const found_id = found[0].dataValues.id_predmeta
        if(Object.keys(found[0])!==0){
            try{
                await Predmet.update(
                    {predmet,profile,course},{
                        where:{id_predmeta : found_id}
                    }
                )
                const upd = await Predmet.findOne({
                    where:{id_predmeta:found_id}
                })
                res.send(upd)
            }
            catch(e){
                return next(ApiError.internal('Не удалось обновить запись'))
            }
        }
        else return next(ApiError.badRequest(`Запись с id=${req.params.id} не найдено`))
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