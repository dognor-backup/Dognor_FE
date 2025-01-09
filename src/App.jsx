import Footer from "./shared/components/footer/Footer";
import LogoNav from "./shared/components/nav/LogoNav";
import Nav from "./shared/components/nav/Nav";
import SubMenuBar from "./shared/components/submenubar/SubMenuBar";

function App() {
  const subMenuList = [
    {
      path: "all",
      label: "전체",
    },
    {
      path: "free",
      label: "헌혈 안내",
    },
    {
      path: "map",
      label: "병원 소식",
    },
    {
      path: "showcase",
      label: "헌혈견 자랑",
    },
    {
      path: "community",
      label: "커뮤니티",
    },
    {
      path: "campaigns",
      label: "캠페인",
    },
    {
      path: "aboutus",
      label: "어바웃어스",
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
