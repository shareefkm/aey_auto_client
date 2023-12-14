import {createSlice} from "@reduxjs/toolkit"

export const driverSlice = createSlice({
    name:"driver",
    initialState:{
        _id: null,
        driver:null,
        token:null,
        blocked:null
    },
    reducers:{
        driverLogin:(state,action)=>{
            const {driver, token, _id} = action.payload
            state.driver = driver
            state.token = token
            state._id = _id
        },
        driverLogout:(state, action) =>{
            state.driver = null
            state.token = null
            state._id = null
        },
    }
})

export const {driverLogin, driverLogout} = driverSlice.actions
export default driverSlice.reducer
