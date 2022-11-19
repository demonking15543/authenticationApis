const express = require("express");
const auth = require('../middlewares/auth')

const { signup, signin, editProfile, deleteUser, displayProfile } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/signin', signin);


userRouter.put('/edit', auth,  editProfile)


userRouter.delete('/delete', auth, deleteUser)

userRouter.get('/my-profile', auth, displayProfile)

module.exports = userRouter;