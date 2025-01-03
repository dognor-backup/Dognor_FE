/** @jsxImportSource @emotion/react */
import React from "react";
import { css, Global, ThemeProvider } from "@emotion/react";
import { theme } from "./shared/styles/theme";
import { GlobalStyles } from "./shared/styles/global";
import styled from "@emotion/styled";
import { Button } from "./shared/components/buttons/Button";
import { IconBtn } from "./shared/components/buttons/IconBtn";
import Plus from "./assets/icons/Plus.svg";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
    
    </ThemeProvider>
  );
}

export default App;
