import { Reducer } from "react";
import {configureStore}  from  '@reduxjs/toolkit'
import { combineReducers } from 'redux'


// function searchResults(){
//     return {
//         type: "SearchResults",
//     };
// }

const initialState = {
    searchResults: []
}


const videoReducer  = (prevState = initialState,action)=>{
    // eslint-disable-next-line default-case
    switch(action.type){
       case "SearchResults":
        return {
           searchResults : action.payload
        }
        default:
            return prevState
    }
}
const reducer = combineReducers({
    videos : videoReducer
})
const store = configureStore({
  reducer,
})
export default store;
