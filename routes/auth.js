const { Router } = require('express');
const { login, register, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/protect');

const router = Router();

router.get('/', protect, getMe);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
