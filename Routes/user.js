import express from "express";
import { changePassword, forgetPassword, logOut, login, register } from "../controller/userController.js";


const router = express.Router()

//register

router.post('/register', register)


//login
router.post('/login', login)


//forget password
router.post('/forget-password', forgetPassword)


//change password
router.post('/change-password', changePassword)


//logout 
router.post('/logout', logOut)









export default router