const ApiError = require('../apiError')
const {Prepod} = require('../db/modals')
const {Op} = require("sequelize")

class Queries{
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
            if(found){
                //try{
                    const upd = await Prepod.update(
                        {surname, name, doljnost, osr, srps, 
                        obrazovanie, vuz,name_of_vuz,
                        spec_diploma, prof_diploma, science_exp, quality},
                        {
                            where:{
                                id_prepoda:req.params.id
                            }
                        })
                        res.write(upd)
                        if(upd[0]>0) res.write(`Обновлено ${upd[0]}`)
                        else res.write("Запись не найдена для обновления")
                    res.end()
                //}
                //catch(e){
                    //return next(ApiError.internal("ошибка"))
               // }
            }
                else next(ApiError.badRequest(`Запись с id=${req.params.id} не найдена`))
    }
    async del_by_id(req,res,next){
            const found = await Prepod.findAll({
                where: {
                    id_prepoda:req.params.id
                }
            })

            if(found){
                try{
                    const del = await Prepod.destroy({
                        where:{
                            id_prepoda:req.params.id
                            }
                        })
                        console.log(typeof(del[0])+" "+del[0])
                    if(parseInt(del[0])>0) res.write(`Удалено ${del[0]} записи`)
                    else res.write("Записей для удаления не найдено")
                    res.end()
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
            if(del[0]>0) res.write(`Удалено ${del[0]} записи`)
            else res.write("Записей для удаления не найдено")
        }
        catch(e){
            return next(ApiError.internal("Не удалось опустошить таблицу"))
        }
    }

}

module.exports = new Queries()