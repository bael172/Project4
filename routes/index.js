const Router = require('express')
const router = new Router()

const prepod = require('./PrepodRoutes')
const para = require('./ParaRoutes')
const predmet = require('./PredmetRoutes')
const rasp = require('./RaspRoutes')

router.use('/prepod',prepod)
router.use('/rasp',rasp)
router.use('/para',para)
router.use('/predmet',predmet)

module.exports = router