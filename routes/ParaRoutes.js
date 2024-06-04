const Router = require('express')
const router = new Router()

module.exports = router

const token = require('../check/token')
const role = require('../check/role')

const para = require('../controllers/Para')

router.post('/add',para.fillForeignKey)
router.post('/edit/:id',para.edit)
router.get("/by_id:id",para.get_by_id)
router.get("/all",para.get_all)
router.delete("/delete:id",para.del_by_id)
router.delete("/deleteAll",para.del_all)
/*
router.get('/get/:id',para.get_by_id)
router.get('/getAll',para.getAll)
router.delete('/delete/:id',para.del_by_id)
router.delete('deleteAll/:id',para.delAll)
*/