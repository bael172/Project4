const sequelize = require('./connect')
const {Sequelize, DataTypes} = require('sequelize')

const Prepod = sequelize.define('prepod',{
    id_prepoda:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    surname:{type:DataTypes.STRING},
    name:{type:DataTypes.STRING},
    doljnost:{type:DataTypes.STRING},
    osr:{type:DataTypes.DECIMAL(10,2)},
    srps:{type:DataTypes.DECIMAL(10,2)},
    obrazovanie:{type:DataTypes.STRING},
    vuz:{type:DataTypes.BOOLEAN},
    name_of_vuz:{type:DataTypes.STRING},
    spec_diploma:{type:DataTypes.STRING},
    prof_diploma:{type:DataTypes.STRING},
    science_exp:{type:DataTypes.BOOLEAN},
    quality:{type:DataTypes.STRING}
})

const Predmet = sequelize.define('predmet',{
    id_predmeta:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    predmet:{type:DataTypes.STRING, allowNull:false, unique:true},
    profile:{type:DataTypes.STRING},
    course_start:{type:DataTypes.INTEGER},
    course_end:{type:DataTypes.INTEGER}
})

const Para = sequelize.define('para',{
    id_pary:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    id_predmet:{type:DataTypes.INTEGER, allowNull:false, references: { model:Predmet, key:'id_predmeta'}},
    id_prepoda:{type:DataTypes.INTEGER, allowNull:false, references: { model:Prepod, key:'id_prepoda'}}
})

const Raspisaniye = sequelize.define('raspisaniye',{
    date:{type:DataTypes.DATEONLY, primaryKey:true},
    group:{type:DataTypes.STRING, primaryKey:true},
    nomer_pary:{type:DataTypes.INTEGER, primaryKey:true},
    id_pary:{type:DataTypes.INTEGER, allowNull:false, references:{model:Para, key:'id_pary'}},
    auditory:{type:DataTypes.STRING},
})

Prepod.hasMany(Para)
Predmet.hasMany(Para)
Para.hasMany(Raspisaniye)

module.exports={
    Prepod,Predmet,Para,Raspisaniye
}