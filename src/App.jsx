import { Outlet } from "react-router-dom";
import Footer from "./shared/components/footer/Footer";
import Nav from "./shared/components/nav/Nav";
import useRestoreUser from "./domains/auth/hooks/useRestoreUser";

function App() {
<<<<<<< HEAD
  return (
    <>
      <Nav />
=======
  useRestoreUser();

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
>>>>>>> 11c11f178e258ae861a6e893ebe88b14b8e7b372
    </>
  );
}

export default App;
