const {Router} = require('express');
const router = Router();

const authController = require('../controllers/auth')
const loginController = require('../controllers/login');
const homeController = require('../controllers/home');
const adminController = require('../controllers/admin');

router.get('/', authController.checkSignedIn, loginController.getLogin);
router.post('/', loginController.postLogin);

router.get('/home', authController.checkSignedOut, homeController.getHome);
router.post('/home/:challenge', homeController.checkFlag);

router.get('/admin', adminController.getAdmin);
router.post('/admin', adminController.postAdmin);

router.post('/admin/:command', adminController.handleCommand);

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
})

module.exports = router;