import { useParams } from "react-router-dom";
import { SettingBanner } from "./SettingBanner";
import styled from "@emotion/styled";
import { Management } from "./Management";
import { User } from "./User";
import { Notice } from "./Notice";
import { Campaign } from "./Campaign";
import { Code } from "./Code";
import { Error } from "./Error";

export function BoardContent({ title }) {
  const { menu } = useParams();

  const ContentComponent = () => {
    switch (menu) {
      case undefined:
        return <Management />;
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
      <DsTitle>{title}</DsTitle>
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
