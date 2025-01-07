import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import router from "./core/routes/router.js";
import { Global, ThemeProvider } from "@emotion/react";
import { theme } from "./shared/styles/theme.js";
import { GlobalStyles } from "./shared/styles/global.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter router={router}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
