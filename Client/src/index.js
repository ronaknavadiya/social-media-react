import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyles from "./Styles/GlobalStyles";
import { AuthProvider } from "./Context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
