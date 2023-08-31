import { createSlice } from "@reduxjs/toolkit";
import { userList } from "../components/Data";

 const userSlice = createSlice({
    name: "users",
    initialState:userList,
    reducers:{
            addUser: (state, action)=>{
                state.push(action.payload)
            },
            updateUser: (state, action)=>{
                //destructing
                const {id, name, lName, email, address, address2, phoneNumber, valid, zipcode} = action.payload;
                const uuser = state.find(user => user.id==id)
                if(uuser){
                    uuser.name = name;
                    uuser.lName= lName;
                    uuser.email= email;
                    uuser.phoneNumber= phoneNumber;
                    uuser.valid= valid;
                    uuser.address= address;
                    uuser.address2=address2;
                    uuser.zipcode=zipcode;
                   
                }
            },
            deleteUser: (state, action)=>{
                const {id} = action.payload;
                const uuser = state.find(user => user.id==id);
                if(uuser){
                    return state.filter(f=> f.id !== id);
                }
            }

    }
})

export const {addUser, updateUser, deleteUser} = userSlice.actions;

export default userSlice.reducer;

