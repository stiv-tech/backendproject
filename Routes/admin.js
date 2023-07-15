import express from "express"
import { loginAdmin, registerAdmin } from "../controller/adminController.js"


const router = express.Router()


router.post('/admin-register', registerAdmin)

router.post('/admin-login', loginAdmin)


export default router