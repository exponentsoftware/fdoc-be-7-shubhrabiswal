const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')

router.get('/:id', usercontroller.getalltodo);
router.get('/', usercontroller.getalluser);
router.post('/',usercontroller.adduser);
router.put('/:id',usercontroller.updateuser)


module.exports = router;