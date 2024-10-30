import React from 'react'

const Practice = () => {
  return (
    <div>
      Practice
    </div>
  )
}

export default Practice







// import { createSlice } from "@reduxjs/toolkit";
// import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";



// const initialState = ({
//   currentUser: null,
//   error:null,
//   loading:false,
// });


// const userSlice = createSlice({
//   name: user,
//   initialState,
//   reducers:{
//     signInStart: (state) => {
//       state.loading = true;
//     },
//     signInSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     signInFailure: (state) => {
//       state.loading = false;
//     }
//   }
// })

// export const {signInStart,signInSuccess,signInFailure} = userSlice.actions;

// export default userSlice.reducer;
