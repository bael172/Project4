const Router = require('express')
const router = new Router()

const token = require('../check/token')
const role = require('../check/role')

const predmet = require('../controllers/Predmet')

router.post("/add",predmet.add)
router.patch("/edit/:id",predmet.edit)
router.get("/get/:id",predmet.get_by_id)
router.get('/getAll',predmet.getAll)
router.delete('/delete/:id',predmet.del_by_id)
router.delete('/deleteAll',predmet.delAll)

module.exports = router