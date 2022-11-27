import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { MainContextProvider } from "./store/main-context";
import "../src/styles/partials/_globals.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

//if strict mode is enabled. The data for the stats table on the group page is duplicated for some reason.
//So I have disabled it.
