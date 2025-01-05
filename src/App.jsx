/** @jsxImportSource @emotion/react */
import { Global, ThemeProvider } from "@emotion/react";
import { theme } from "./shared/styles/theme";
import { GlobalStyles } from "./shared/styles/global";
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
