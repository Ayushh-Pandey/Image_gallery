import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'light'
}


export const colorModeSlice = createSlice({
    name:'mode',
    initialState,
    reducers:{
        toggleColorMode: (state,action)=>{
            if(state.value==='light'){
                state.value = 'dark';
            }
            else {
                state.value = 'light';
            }
            sessionStorage.setItem('theme',`${state.value}`)
        }
    }
})

export const {toggleColorMode} = colorModeSlice.actions

export default colorModeSlice.reducer