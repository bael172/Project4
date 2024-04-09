const Router = require('express')
const router = new Router()

const token = require('../check/token')
const role = require('../check/role')

const prepod = require('../controllers/Prepod')

router.post('/add',prepod.add)
router.post('/edit/:id',prepod.edit)
router.get('/del/:id',prepod.del)
router.get("/get_by_id/:id",prepod.get_by_id)
router.get("/get_all",prepod.get_all)
router.get("del_all/:id",prepod.del_all)

module.exports=router
