// import { errorHandler } from "./utils/error";




// export const updatedUser = async(req,res,next) => {
//    try{
//       const userId = req.params.id;

//       const existingUser = await userId.findById(userId);
//       if(!existingUser){
//          return res.status(404).json({error: 'user not found'});
//       }

//       const {username,email, password, avatar} = req.body;

//       const updates = {
//          username:username || existingUser.username,
//          email: email || existingUser.email,
//          avatar: avatar || existingUser.avatar,
//          password: password ? bcryptjs.hashSync(password, 10) : existingUser.password,                               
//       };

//       const updatedUser = await User.findByIdAndUpdate(userId, {$set: updates}, {new:true});

//       if(!updatedUser){
//          return next(errorHandler(404, 'user not found after update'));
//       }

//       const token = jwt.sign({id: updatedUser._id}, process.env.JWT_SECRET);

//       const {password:pass, ...rest} = updatedUser._doc;
//       res.status(200).json({rest, token});
//    }catch(error){
//       console.log('internal server error', error);
//       res.status(500).json({error: 'Internal server error'});
//    }
// };