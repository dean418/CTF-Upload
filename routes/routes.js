const {Router} = require('express');
const router = Router();

const authController = require('../controllers/auth')
const loginController = require('../controllers/login');
const homeController = require('../controllers/home');

router.get('*', authController.checkSession);

router.get('/', loginController.getLogin);
router.post('/', loginController.postLogin);

router.get('/home', homeController.getHome);

module.exports = router;