import { useOutletContext, useParams } from "react-router-dom";
import { SettingBanner } from "./components/SettingBanner";
import { Management } from "./Management";
import { User } from "./User";
import { Notice } from "./Notice";
import { Campaign } from "./components/Campaign";
import { Code } from "./components/Code";
import { Error } from "./components/Error";
import styled from "@emotion/styled";

export function BoardContent() {
  const menuData = useOutletContext();
  const { menu } = useParams();
  console.log(menu);
  const number = Math.max(
    menuData.findIndex((data) => data.path === menu),
    0
  );

  const ContentComponent = () => {
    switch (menu) {
      case "user":
        return <User />;
      case "notice":
        return <Notice />;
      case "campaign":
        return <Campaign />;
      case "banner":
        return <SettingBanner />;
      case "code":
        return <Code />;
      case "error":
        return <Error />;
      default:
        return <Management />;
    }
  };
  return (
    <Content>
      <DsTitle>{menuData[number]?.title}</DsTitle>
      <ContentComponent />
    </Content>
  );
}
const DsTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
  margin: 48px 0;
  text-align: center;
`;
const Content = styled.div`
  width: 100%;
  padding-bottom: 100px;
`;
