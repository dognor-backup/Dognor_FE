import Footer from "./shared/components/footer/Footer";
import LogoNav from "./shared/components/nav/LogoNav";
import Nav from "./shared/components/nav/Nav";
import SubMenuBar from "./shared/components/submenubar/SubMenuBar";

function App() {
  const subMenuList = [
    {
      path: "all",
      label: "All",
    },
    {
      path: "free",
      label: "자유게시판",
    },
    {
      path: "map",
      label: "질문있어요",
    },
    {
      path: "showcase",
      label: "고마워요",
    },
    {
      path: "aboutus",
      label: "헐액이 필요해요",
      color: "red",
    },
  ];

  return (
    <>
      <Nav />
      <SubMenuBar subMenuList={subMenuList} />
    </>
  );
}

export default App;
