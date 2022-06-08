import {createSlice} from "@reduxjs/toolkit";

const initialState={name: null,url:null,caption:"",captionFontSize:"20",captionFontColor:"#000000"}

const singleVideoSlice = createSlice({
    name:"singlevideo",
    initialState,
    reducers:{
        setSingleVideo(state,action){
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.url = action.payload.url;
            state.caption = action.payload.caption;
            state.captionFontSize = action.payload.captionFontSize;
            state.captionFontColor = action.payload.captionFontColor;
        }

    }
})
export default singleVideoSlice.reducer;
export const singleVideoAction = singleVideoSlice.actions;