import { useParams } from "react-router-dom";
import { SettingBanner } from "./SettingBanner";
import styled from "@emotion/styled";

export function BoardContent({ title }) {
  const { menu } = useParams();
  console.log("메뉴", menu);
  // const ContentComponent = () =>{
  //    switch (menu) {
  //      case "":
  //        return <NoticeManagement />;
  //      case "user":
  //        return <UserManagement />;
  //      default:
  //        return <DefaultPage />;
  //    }
  // }
  return (
    <Content>
      <DsTitle>{title}</DsTitle>
      <SettingBanner />
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
