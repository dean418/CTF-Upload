const {Router} = require('express');
const router = Router();

const authController = require('../controllers/auth')
const loginController = require('../controllers/login');
const homeController = require('../controllers/home');

router.get('/', authController.checkSignedIn, loginController.getLogin);
router.post('/', loginController.postLogin);

router.get('/home', authController.checkSignedOut, homeController.getHome);
module.exports = router;