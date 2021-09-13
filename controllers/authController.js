import User from '../models/user';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from '../utills/errorHandler';
import absoluteUrl from 'next-absolute-url';
import sendEmail from '../utills/sendEmail';

// Register User  => /api/auth/register
const registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;
    const user = await User.create({
        name, 
        email,
        password
    })

    res.status(200).json({
        success: true,
        message: "Account registered Succesfully"
    })
}); 

// Current User Profile  => /api/me
const currentUserProfile = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    
    res.status(200).json({
        success: true,
        user
    })
}); 

// Update User Profile  => /api/me/update
const updateUserProfile = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name;
        user.email = req.body.email;
        
        if(req.body.password){
            user.password = req.body.password
        }
    }

    await user.save();
    
    res.status(200).json({
        success: true
    })
}); 

// Forget Password  => /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {

    console.log("Email => ", req.body.email);

    const user = await User.findOne({ email: req.body.email });

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404))
    }

    // Get Reset Token 
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Get Origin/Domain
    const { origin } = absoluteUrl(req);

    // create reset password url 
    const resetUrl = `${origin}/password/reset/${resetToken}`
    
    const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'BookIT Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    }catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
}); 


export {
    registerUser,
    currentUserProfile,
    updateUserProfile,
    forgotPassword
}