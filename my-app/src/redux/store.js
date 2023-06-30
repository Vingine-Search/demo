import { configureStore, combineReducers } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";

const rootReducer = combineReducers({
    video: videoReducer,
  });


  const store =  configureStore({
    reducer: rootReducer
  });


  export default store;