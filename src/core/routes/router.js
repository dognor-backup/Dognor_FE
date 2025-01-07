import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home/Home";
import DonationInfo from "../../pages/donationinfo/DonationInfo";
import AboutUs from "../../pages/aboutus/AboutUs";
import Showcase from "../../pages/showcase/Showcase";
import HospitalMap from "../../pages/hospitalmap/HospitalMap";
import Campaigns from "../../pages/campaigns/Campaigns";
import MyPage from "../../pages/mypage/MyPage";
import Community from "../../pages/community/Community";
import Nav from "../../shared/components/nav/Nav";
import Login from "@/pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Nav,
    children: [
      { path: "/", Component: Home },
      { path: "login", Component: Login },
      { path: "signup", Component: Home },
      { path: "donationinfo", Component: DonationInfo },
      { path: "aboutus", Component: AboutUs },
      { path: "showcase", Component: Showcase },
      { path: "map", Component: HospitalMap },

      {
        path: "campaigns",
        Component: Campaigns,
        children: [
          { path: ":id", Component: Home },
          { path: "edit/:id", Component: Home },
          { path: "new", Component: Home },
        ],
      },

      {
        path: "mypage",
        Component: MyPage,
        children: [{ path: "accountsettings", Component: Home }],
      },

      {
        path: "community",
        Component: Community,
        children: [
          { path: "noticedetail/:id", Component: Home },
          {
            path: "communitylist/:categoryid",
            Component: Home,
            children: [{ path: "postdetail/:id", Component: Home }],
          },
          { path: "postedit/:id", Component: Home },
          { path: "postnew", Component: Home },
        ],
      },
      { path: "dashboard", Component: Home },
    ],
  },

  // {
  //   path: "login",
  //   Component: Home,
  //   children: [
  //     { path: "findaccount", Component: Home },
  //     { path: "guidepage", Component: Home },
  //     { path: "changepassword", Component: Home },
  //   ],
  // },

  { path: "welcome", Component: Home },
  { path: "이용약관", Component: Home },
  { path: "*", Component: Home }, // 모든 경로에 대해 에러 처리
]);

export default router;
