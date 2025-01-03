/** @jsxImportSource @emotion/react */
import React from "react";
import { css, Global, ThemeProvider } from "@emotion/react";
import { theme } from "./shared/styles/theme";
import { GlobalStyles } from "./shared/styles/global";
import { LogoutBtn } from "./shared/components/nav/LogoutBtn";
import Nav from "./shared/components/nav/Nav";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <Nav />
    </ThemeProvider>
  );
}

export default App;
