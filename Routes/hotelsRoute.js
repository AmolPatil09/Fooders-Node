const express = require('express');
const router = express.Router();
const restarentsController=require('../Controllers/restarentsController')

const validation=require('../Utilities/validation')


router.get('/restarents',restarentsController.restorents)






module.exports = router;