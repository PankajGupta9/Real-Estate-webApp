import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import {errorHandler}  from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const test = (req, res) => {
    res.json({
        message: 'api route is workig !',
    });
};






export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const { username, password, avatar } = req.body;

    const updates = {
      username: username || existingUser.username,
      avatar: avatar || existingUser.avatar,
      password: password ? bcryptjs.hashSync(password, 10) : existingUser.password,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found after update" });
    }

    // Generate a new token after updating user details
    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, { expiresIn: '1day' });

    // Exclude password from the response
    const { password: pass, ...rest } = updatedUser._doc;

    res.status(200).json({ rest, token });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





export const deleteUser = async(req,res,next) => {
  console.log('User from token:', req.user);
  console.log('Params ID:', req.params.id);

  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can  only delete your own account !'));

  try{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  }catch(error){
    next(error);
  }
}















// //this code suggested by sahand
// export const updateUser = async(req, res, next) => {
//     if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account !"));
//     try{
//         if(req.body.password){
//             req.body.password = bcryptjs.hashSync(req.body.password, 10)
//         }

//         const updateUser = await User.findByIdAndUpdate(req.params.id,{
//             $set: {
//                 username: req.body.username,
//                 email:req.body.email,
//                 password:req.body.password,
//                 avatar: req.body.avatar,
//             }
//         }, {new:true})

//         const {password, ...rest} = updateUser._doc

//         res.status(200).json(rest);
//     }catch(error){
//         next(error)
//     }
// };


