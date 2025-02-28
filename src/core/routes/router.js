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
import AccountSettings from "@/pages/accountsettings/AccountSettings";
import { Agreement } from "@/pages/signup/Agreement";
import { SignUpComplete } from "@/pages/signup/SignUpComplete";
import { PostForm } from "@/pages/community/PostForm";
import { CommunityList } from "@/pages/community/components/CommunityList";
import { CommunityLink } from "@/pages/community/components/ComminityLink";
import { PostDetail } from "@/pages/community/PostDetail";
import { CampaignForm } from "@/pages/campaigns/CampaignForm";
import { CampaignDetail } from "@/pages/campaigns/CampaignDeatil";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { BoardContent } from "@/pages/dashboard/BoardContent";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
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
      },
      {
        path: "accountsettings",
        Component: AccountSettings,
      },
      {
        path: "community",
        Component: Community,
        children: [
          { index: true, Component: CommunityLink },
          { path: ":menu", Component: CommunityList },
        ],
      },
      {
        path: "dashboard",
        Component: Dashboard,
        children: [
          { index: true, Component: BoardContent },
          { path: ":menu", Component: BoardContent },
        ],
      },
      { path: "postnew", Component: PostForm },
      { path: "postdetail/:id", Component: PostDetail },
      { path: "postedit/:id", Component: PostForm },
    ],
  },

  { path: "findaccount", Component: FindAccount },
  { path: "guidepage", Component: Home },
  { path: "changepassword", Component: Home },

  { path: "welcome", Component: SignUpComplete },
  { path: "agreement", Component: Agreement },
  { path: "*", Component: Home },
]);

export default router;
