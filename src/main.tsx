import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./i18n/i18n.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="486285301849-fjcp1e941fdrhkpj0ufjom8mqu8r0chv.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>,
);
