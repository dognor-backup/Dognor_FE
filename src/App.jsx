import { Outlet } from "react-router-dom";
import Footer from "./shared/components/footer/Footer";
import Nav from "./shared/components/nav/Nav";
import { useEffect } from "react";
import useUserStore from "./domains/auth/store/useUserStore";

function App() {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser({ token });
    }
  }, []);

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
