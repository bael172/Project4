const Router = require('express')
const router = new Router()

const token = require('../check/token')
const role = require('../check/role')

const prepod = require('../controllers/Prepod')

router.post('/add',prepod.add)
router.patch('/edit/:id',prepod.edit)
router.get('/get/:id',prepod.get_by_id)
router.get('/getAll',prepod.get_all)
router.delete('/delete/:id',prepod.del_by_id)
router.delete('/deleteAll',prepod.del_all)


module.exports=router
