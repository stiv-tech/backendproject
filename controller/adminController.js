import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js";


//admin register

const registerAdmin = async(req, res) =>{
    try{
        const {name, email, password} = req.body
        const adminExist = await Admin.findOne({email: email})
        if(adminExist){
            res.status(400).json({message: 'admin exist'})
        }else{
            const newAdmin = await new Admin({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
            })
            const saveAdmin = await newAdmin.save();
            if(saveAdmin){
                res.json({message: ' registration successful', saveAdmin})
            }else{
                res.status(400).json({message:"registration failed"})
            }
        }
    }catch(err){
        throw new Error(err)
    }
}

//admin login

const loginAdmin = async(req, res) => {
    try{
        const {email, password} = req.body
        const admin = await Admin.findOne({email: email})
        if(admin){
            const isMatch = bcrypt.compareSync(password, admin.password)
            if(isMatch){
                const token = generateToken(admin._id)
                res.json({message: 'login successful', token, admin})
            }else{
                res.status(400).json({message: 'wrong admin name or password'})
            }
        }else{
            res.status(400).json({message: ' Admin not found'})
        }
    }catch(err){
        throw new Error(err)
    }
}

export{registerAdmin, loginAdmin}