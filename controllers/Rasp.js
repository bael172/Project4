const {Op} = require("sequelize")
const ApiError = require("../apiError")
const {Raspisaniye} = require("../db/modals")

class Rasp{
    async by_date(req,res,next){
        const found=Raspisaniye.findAll({
            where:{
                date:req.params.date
            }
        })
        res.json(found)
    }
    async by_group(req,res,next){
        const found=Raspisaniye.findAll({
            where:{
                group:req.params.group
            }
        })
        res.json(found)
    }
    async by_date_group(req,res,next){
        const found=Raspisaniye.findAll({
            where:{
                [Op.and]:[
                    {date:req.query.date},
                    {group:req.query.group}
                ]
            }
        })
        res.json(found)
    }
    async all(req,res,next){
        const found=Raspisaniye.findAll({})
        res.json(found)
    }
    async add_rasp(req,res,next){
        const {date,group,nomer_pary,id_pary,auditory} = req.body
        const found = Raspisaniye.findAll({
            where:{
                date,
                group,
                nomer_pary,
                id_pary
            }
        })
        if(found.length==0){
            const created=Raspisaniye.create({
                date,group,nomer_pary,id_pary,auditory
            })
            if(created>0){ res.write("Запись создана"); res.write(created) }
            else res.write("Не удалось создать запись")
        }
        else res.write("Такая запись уже существует")

    }
    async upd_rasp(req,res,next){
        let condition = JSON.parse(req.query)
        const found=Raspisaniye.findAll({
            where:{condition}
        })
        res.write(JSON.stringify(found))

        const upd=Raspisaniye.update(
            {date:req.body.date}, 
            {group:req.body.group}, 
            {nomer_pary:req.body.nomer_pary}, 
            {auditory:req.body.auditory},
            {ParaIdPary:req.body.id_pary},{
                where:{condition}
            }
        )
        if(upd[0]>0){
            res.write(`Обновлено ${upd[0]} записи`)
        }
        else res.write("Запись не найдена для обновления")
    }
    async del_rasp(req,res,next){
        let condition = JSON.parse(req.query)
        const found = Raspisaniye.findAll({
            where:{condition}
        })
        res.write(JSON.stringify(found))

        const del=Raspisaniye.destroy({
            where:{condition}
        })
        if(del[0]>0){
            res.write(`Удалено ${del[0]} записи`)
        }
        else res.write("Записей для удаления не найдено")
    }
    
}

module.exports = new Rasp()