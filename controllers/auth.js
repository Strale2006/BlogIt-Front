const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');


exports.register = async (req, res, next) =>{
    const {username, email, password} = req.body;

    try{
        const user = await User.create({
            username,email,password
        });

        sendToken(user, 201, res);
    }catch (e){
        next(e);
    }
}

exports.login = async (req, res, next) =>{
    const {email, password} = req.body;

    if (!email || !password){
        return next(new ErrorResponse("Please provide an email and a password", 400));
    }

    try{
        const user = await User.findOne({email}).select("+password");

        if (!user){
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch){
            return next(new ErrorResponse("Invalid credentials", 404));
        }

        sendToken(user, 200, res);

    }catch (e) {
        next(e);
    }

}

exports.forgotPassword = async (req, res, next) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return next(new ErrorResponse("Email could not be sent", 404));
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
            <div style="display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100vh;
                        background: radial-gradient(ellipse at bottom, #1B2735 0%, #12141d 100%);
                        font-size: 20px;
                        color:#ffeba7">
                <h1> You have requested a new password reset</h1>
                <p> Please go to this link to reset your password</p>
                <button style="background-color: #ffeba7;
                                border-radius: 5px;
                                width: 175px;
                                height: 35px;
                                border: none;
                                outline: none;
                                font-weight: 700;
                                color: #333333;"><a href=${resetUrl}>Reset Password</a></button>
            </div>
        `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset - HaD",
                text: message,
            });

            res.status(200).json({success: true, data: "Email sent"});
        } catch (emailError) {
            console.error(emailError);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};


exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = req.params.resetToken

    console.log("Hashed Token from URL:", resetPasswordToken);

    try {
        const timestamp = Date.now();
        const dateObject = new Date(timestamp);

        console.log("Timestamp:", timestamp);
        console.log("Date Object:", dateObject);
        console.log("Reset Password Token:", resetPasswordToken);

        let userCheck = await User.findById("64de27cd210fd4a3839462ab")
        console.log(userCheck.resetPasswordToken + " <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

        const user = await User.findOne({ "resetPasswordToken": resetPasswordToken });
        console.log("User Found:", user);

        if (!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400));
        }

        // The following lines shouldn't be reached if the user is null
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        console.log("Password Reset Successful:", user);

        res.status(201).json({
            success: true,
            data: "Password Reset Success",
            token: user.getSignToken(),
        });
    } catch (e) {
        console.error('An error occurred:', e); // Log the error for debugging
        next(e);
    }


}

const sendToken = (user, statusCode, res)=>{
    const token = user.getSignToken();

    res.status(statusCode).json({success:true, token});
}



