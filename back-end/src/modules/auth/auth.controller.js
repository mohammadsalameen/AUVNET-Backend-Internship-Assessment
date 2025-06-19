import sendEmail from "../../utils/sendEmail.js";
import { customAlphabet } from "nanoid";
import { signToken, verifyToken } from "../../utils/tokenUtils.js";
import { sendCodeEmail, WelcomeEmail } from "../../utils/emailMessages.js";
import { comparePassword, hashPassword } from "../../utils/passwordUtils.js";
import { createUser, findUserByEmail, updateUser } from "../../repository/userRepo.js";

export const register = async (req, res, next) =>{
    const {userName, email, password} = req.body;
    const user = await findUserByEmail(email);
    if(user){
        return res.status(404).json({message : "email is already exist"});
    }
    const hashedPassword = await hashPassword(password);
    const createdUser = await createUser(userName, email, hashedPassword);
    const token = signToken(email, process.env.SIGNATURE);
    const html = WelcomeEmail(userName, req.protocol, req.headers, token);

    await sendEmail(email, 'Confirm Email', html);
    return res.status(201).json({message : 'success', user : createdUser});
}

export const confirmEmail = async (req, res) =>{
    const {token} = req.params;
    const decoded = verifyToken(token, process.env.SIGNATURE);
    await updateUser({email : decoded.email}, {confirmEmail : true});
    return res.status(200).json({message : "success"});
}

export const login = async (req, res) =>{
    const {email, password} = req.body;
    const user = await findUserByEmail(email);

    if(!user){
        return res.status(400).json({message : 'invalid data'});
    }
    if(!user.confirmEmail){
        return res.status(400).json({message : 'please confirm your email'});
    }

    if(user.status == 'not_active'){
        return res.status(400).json({message : 'your account is blocked'});
    }

    const match = await comparePassword(password, user.password);
    if(!match){
        return res.status(400).json({message : 'invalid data'});
    }

    const token = signToken({id : user._id, userName : user.userName, role : user.role}, process.env.LOGIN_SIGNATURE);
    return res.status(200).json({message : "success", token});
}

export const sendCode = async (req, res) =>{
    const {email} = req.body;
    const code = customAlphabet('1234567890abcdef', 4)();
    await updateUser({email : email}, {sendCode : code});
    const html = sendCodeEmail(code);
    await sendEmail(email, 'reset password', html);
    return res.status(200).json({message : "success"});
}

export const resetPassword = async (req, res) =>{
    const {code, email, password} = req.body;
    const user = await findUserByEmail(email);
    
    if(!user){
        return res.status(400).json({message : "not register account"});
    }
    
    if(user.sendCode != code){
        return res.status(400).json({message : "invalid code"});
    }
    
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.sendCode = null;
    
    await user.save();

    return res.status(200).json({message : "success"})

}