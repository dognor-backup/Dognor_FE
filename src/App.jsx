import LogoNav from "./shared/components/nav/LogoNav";
import Nav from "./shared/components/nav/Nav";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
    </ThemeProvider>
  );
}

export default App;
