const express = require('express');
const router = express.Router();

const {register, login, forgotPassword, resetPassword, sendVerificationEmail,
     verifyEmail, updateUserTasks, getUserTasks} = require('../controllers/auth');

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword/:resetToken").put(resetPassword);

router.route("/sendVerificationEmail").post(sendVerificationEmail);

router.route("/verifyEmail/:verificationToken").get(verifyEmail);

router.route("/tasks/:userId").get(getUserTasks);

router.route("/tasks").put(updateUserTasks);


module.exports = router;

