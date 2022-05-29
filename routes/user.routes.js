let express = require('express');
let router = express.Router();

const userCtrl = require('../controllers/user.controller')


/* GET users listing. */
router.get('/', userCtrl.getUsers);

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.delete('/delete/:id', userCtrl.deleteUser)

router.post('/upload-avatar', userCtrl.uploadImage)

router.post('/checkToken', userCtrl.checkToken)

router.get('/current', userCtrl.getCurrentUser)

module.exports = router;
