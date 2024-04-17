const ApiError = require('../apiError')
const {Prepod} = require('../db/modals')
const {Op} = require("sequelize")

class Queries{
    async add(req,res,next){
            const {id_prepoda, surname, name, doljnost, osr, srps,
            obrazovanie, vuz, name_of_vuz, spec_diploma, prof_diploma,
            science_exp, quality} = req.body
            const found = await Prepod.findAll({
                    where:{
                        [Op.and]:[
                        {surname: surname},
                        {name: name},
                        {doljnost: doljnost},
                        {osr:osr}
                        ]
                    }
            })
            console.log(found)
            if(found.length==0){
                try{
                    const created=await Prepod.create({
                        id_prepoda, surname, name, 
                        doljnost, osr, srps, 
                        obrazovanie, vuz, name_of_vuz, spec_diploma,
                        prof_diploma, science_exp, quality
                    })
                    res.send(created)
                }
                catch(e){
                    return next(ApiError.internal("Не удалось создать запись"))
                }
            }
            else return next(ApiError.badRequest("Данная запись уже существует"))
            //return next(ApiError.internal("ошибка"))
        
    }
    async edit(req,res,next){
        const {surname,name,doljnost,osr,srps,obrazovanie,vuz,name_of_vuz,
        spec_diploma,prof_diploma,science_exp,quality} = req.body
        const found = await Prepod.findAll({
                where: {
                    id_prepoda:req.params.id
                }
            })
            const found_id= found[0].dataValues.id_prepoda
            if(Object.keys(found[0]).length!==0){
                //try{
                    const upd = await Prepod.update(
                        {surname, name, doljnost, osr, srps, 
                        obrazovanie, vuz,name_of_vuz,
                        spec_diploma, prof_diploma, science_exp, quality},
                        {
                            where:{
                                id_prepoda:found_id
                            }
                        })
                        res.send(upd)
                        //if(upd=="1") res.write("Запись обновлена")
                        //else res.end()
                //}
                //catch(e){
                    //return next(ApiError.internal("ошибка"))
                //}
            }
                else next(ApiError.badRequest(`Запись с id=${req.params.id} не найдена`))
    }
    async del_by_id(req,res,next){
            const found = await Prepod.findAll({
                where: {
                    id_prepoda:req.params.id
                }
            })
            console.log("Is found an array?",Array.isArray(found))
            console.log("found.length = ",found.length)
            console.log(found)
            const found_id = check1[0].dataValues.id_prepoda

            if(Object.keys(found).length!==0){
                try{
                    const del = await Prepod.destroy({
                        where:{
                            id_prepoda:found_id
                            }
                        })
                    del.then(value=>{
                        res.write(value)
                        if(value==='fulfilled') res.write(`Запись с id = ${found_id} стёрта`)
                        res.end()
                    })
                }
                catch(e){
                    return next(ApiError.internal("Не удалось удалить запись"))
                }
            }
            else res.send(`Запись с id=${req.params.id} не найдена`)
    }
    async del_all(req,res,next){
        try{
            const del = await Prepod.destroy({
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
            const got = await Prepod.findOne({
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
            const got = await Prepod.findAll({})
            res.send(got)
        }
        catch(e){
            return next(ApiError.internal("Ошибка"))
        }
    }

}

module.exports = new Queries()