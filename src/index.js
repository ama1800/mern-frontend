import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "./style.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if(process.env.NODE_ENV === 'production') disableReactDevTools()
let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>
);

