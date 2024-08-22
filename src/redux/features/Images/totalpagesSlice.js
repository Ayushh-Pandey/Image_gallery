import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

export const totalpagesSlice = createSlice({
    name: 'totalpages',
    initialState,
    reducers:{
        setTotalPages: (state,action)=>{
            state.value = action.payload
        }
    }
})

export const {setTotalPages} = totalpagesSlice.actions

export default totalpagesSlice.reducer