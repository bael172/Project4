const ApiError = require('../apiError')
const {Prepod} = require('../db/modals')
const {Op} = require("sequelize")

class Queries{
    async add(req,res,next){
            const {id_prepoda, surname, name, doljnost, osr, srps,
            obrazovanie, vuz, name_of_vuz, spec_diploma, prof_diploma,
            science_exp, quality} = req.body
            const found = await Prepod.findOne({
                where:{
                    surname: surname,
                    name: name,
                    doljnost: doljnost,
                    osr:osr
                }
            })
            if(!found){
                const created=await Prepod.create({
                    id_prepoda, surname, name, 
                    doljnost, osr, srps, 
                    obrazovanie, vuz, name_of_vuz, spec_diploma,
                    prof_diploma, science_exp, quality
                })
                res.send(created)
            }
            else return res.send("Данная запись уже существует")
            //return next(ApiError.internal("ошибка"))
        
    }
    async edit(req,res,next){
        const {surname,name,doljnost,osr,srps,obrazovanie,vuz,name_of_vuz,
        spec_diploma,prof_diploma,science_exp,quality} = req.body
        const check1 = await Prepod.findAll({
                where: {
                    id_prepoda:req.params.id
                }
            })
            //console.log("check1=array?",Array.isArray(check1))
            //console.log("check1.length = ",check1.length)
            //console.log("check1=",check1)
        //try{
            if(check1.length!==0){
                    const upd = await Prepod.update({
                        surname, name, doljnost, osr, srps, 
                        obrazovanie, vuz,name_of_vuz,
                        spec_diploma, prof_diploma, science_exp, quality,
                        where:{
                                id_prepoda:req.params.id
                            }
                        })
                    res.json("Запись обновлена",upd)
                }
                else res.send(`Запись с id=${req.params.id} не найдена`)
            //}
        //catch(e){
        //    return next(ApiError.internal("ошибка"))
        //}
    }
    async del(req,res,next){
            const check1 = await Prepod.findAll({
                where: {
                    id_prepoda:req.params.id
                }
            })
            console.log("check1 is array?",Array.isArray(check1))
            console.log("check1.length = ",check1.length)
            const check1_id = check1.dataValues.id_prepoda
        try{
            if(check1.length!==0){
                    Prepod.destroy({
                        where:{
                            id:check1_id
                            }
                        })
                    res.send(`Запись с id = ${check1_id} стёрта нахуй`)
                }
                else res.send(`Запись с id=${req.params.id} не найдена`)
            }
        catch(e){
            return ApiError(internal,"ошибка")
        }
    }
    async get_by_id(req,res,next){
        const found = await Prepod.findAll({
            where:{
                id_prepoda : req.params.id
            }
        })
        if(found.length!==0){
            res.json(found)
        }
        else res.send("Ничего не найдено")
    }
    async get_all(req,res,next){
        const found = await Prepod.findAll()
        return res.json(found)
    }
    async del_all(req,res,next){
        const found = await Prepod.findAll()
        await Prepod.destroy({
            truncate:true
        })
        const msg = new Map()
        msg.set(null,"Таблица опустошена")
        return res.json("Таблица опустошена:"+found)
    }
}

module.exports = new Queries()