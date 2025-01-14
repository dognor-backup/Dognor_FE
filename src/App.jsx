import { Outlet } from "react-router-dom";
import Footer from "./shared/components/footer/Footer";
import Nav from "./shared/components/nav/Nav";

function App() {

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
