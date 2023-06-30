// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import videoReducer from "./videoSlice";

// const rootReducer = combineReducers({
//     video: videoReducer,
//   });


//   const store =  configureStore({
//     reducer: rootReducer
//   });


//   export default store;
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import videoReducer from "./videoSlice";

const rootReducer = combineReducers({
  video: videoReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});


export default store;