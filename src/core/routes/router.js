import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home/Home";
import DonationInfo from "../../pages/donationinfo/DonationInfo";
import AboutUs from "../../pages/aboutus/AboutUs";
import Showcase from "../../pages/showcase/Showcase";
import HospitalMap from "../../pages/hospitalmap/HospitalMap";
import Campaigns from "../../pages/campaigns/Campaigns";
import MyPage from "../../pages/mypage/MyPage";
import Community from "../../pages/community/Community";
import Login from "@/pages/login/Login";
import FindAccount from "@/pages/findaccount/FindAccount";
import SignUp from "@/pages/signup/SignUp";
import App from "@/App";
import { Agreement } from "@/pages/signup/Agreement";
import { SignUpComplete } from "@/pages/signup/SignUpComplete";

import { PostForm } from "@/pages/community/PostForm";
import { CommunityList } from "@/pages/community/components/CommunityList";
import { CommunityLink } from "@/pages/community/components/ComminityLink";
import { PostDetail } from "@/pages/community/PostDetail";
import { CampaignForm } from "@/pages/campaigns/CampaignForm";
import { CampaignDetail } from "@/pages/campaigns/CampaignDeatil";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "home", Component: Home },
      { path: "login", Component: Login },
      { path: "signup", Component: SignUp },
      { path: "donationinfo", Component: DonationInfo },
      { path: "aboutus", Component: AboutUs },
      { path: "showcase", Component: Showcase },
      { path: "map", Component: HospitalMap },

      {
        path: "campaigns",
        Component: Campaigns,
      },
      { path: "campaigns/postnew", Component: CampaignForm },
      { path: "campaign/:id", Component: CampaignDetail },
      { path: "campaignedit/:id", Component: CampaignForm },
      {
        path: "mypage",
        Component: MyPage,
        children: [{ path: "accountsettings", Component: Home }],
      },
      {
        path: "community",
        Component: Community,
        children: [
          { index: true, Component: CommunityLink },
          { path: ":menu", Component: CommunityList },
        ],
      },
      { path: "postnew", Component: PostForm },
      { path: "postdetail/:id", Component: PostDetail },
      { path: "postedit/:id", Component: PostForm },
    ],
  },
  { path: "dashboard", Component: Home },
  { path: "findaccount", Component: FindAccount },
  { path: "guidepage", Component: Home },
  { path: "changepassword", Component: Home },

  { path: "welcome", Component: SignUpComplete },
  { path: "agreement", Component: Agreement },
  { path: "*", Component: Home }, // 모든 경로에 대해 에러 처리
]);

export default router;
