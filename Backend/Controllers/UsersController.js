import UserModel from "../Models/SchemaModel.js";
export const getAllUsers = async (req, res, next)=>{
    try {
        const users = await UserModel.find()
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}