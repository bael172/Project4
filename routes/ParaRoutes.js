const Router = require('express')
const router = new Router()

module.exports = router

const token = require('../check/token')
const role = require('../check/role')

const para = require('../controllers/Para')

router.post('/add',para.add)
router.post('/edit',para.edit)
/*
router.get('/get/:id',para.get_by_id)
router.get('/getAll',para.getAll)
router.delete('/delete/:id',para.del_by_id)
router.delete('deleteAll/:id',para.delAll)
*/