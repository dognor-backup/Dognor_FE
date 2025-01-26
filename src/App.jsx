import { Outlet } from "react-router-dom";
import Footer from "./shared/components/footer/Footer";
import Nav from "./shared/components/nav/Nav";
import useRestoreUser from "./domains/auth/hooks/useRestoreUser";

function App() {
  useRestoreUser();

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
