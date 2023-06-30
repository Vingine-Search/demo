import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from './redux/store'

// redux-persistor
// import store from './redux/store.js'
// import { Provider } from 'react-redux'
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
// let persistor = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);
