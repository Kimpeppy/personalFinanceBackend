const express = require('express')
const router = express.Router()
const plaidController = require('../controllers/plaidController') 

router.post('/create_link_token', plaidController.generateLinkToken)
router.post('/set_access_token', plaidController.setAccessToken)

module.exports = router