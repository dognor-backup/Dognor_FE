/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css, Global, ThemeProvider } from "@emotion/react";
import { theme } from "./shared/styles/theme";
import { GlobalStyles } from "./shared/styles/global";
import Checkbox from "./shared/components/checkbox/Checkbox";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
    </ThemeProvider>
  );
}

export default App;
