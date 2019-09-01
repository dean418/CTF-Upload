const {Router} = require('express');
const router = Router();

const authController = require('../controllers/auth')
const loginController = require('../controllers/login');
const homeController = require('../controllers/home');
const adminController = require('../controllers/admin');

router.get('/', authController.checkSignedIn, loginController.getLogin);
router.post('/', loginController.postLogin);

router.get('/home', authController.checkSignedOut, homeController.getHome);

router.get('/admin', adminController.getAdmin);
router.post('/admin', adminController.postAdmin);

router.get('/adminPanel', adminController.getAdminPanel);
module.exports = router;