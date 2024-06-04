const Router = require('express')
const router = new Router()

const token = require('../check/token')
const role = require('../check/role')

const Rasp = require('../controllers/Rasp')

router.post('/add',Rasp.add_rasp)
router.get('/by_date/:date',Rasp.by_date)
router.get('/by_group/:group',Rasp.by_group)
router.get('/by_dategroup',Rasp.by_date_group) //req.query
router.get('/all',Rasp.all)
router.put('/update',Rasp.upd_rasp) //req.query
router.delete('/delete',Rasp.del_rasp) //req.query


module.exports = router