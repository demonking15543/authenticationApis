const router = express.Router();

const auth = require('./src/middlewares/auth');
  
const user = require('./controllers/users');

router.get('/:id', auth, user.profile);
router.put('/edit/:id', auth, user.editProfile);
router.delete('/delete/:id', auth, user.delteProfile);

module.exports = router;