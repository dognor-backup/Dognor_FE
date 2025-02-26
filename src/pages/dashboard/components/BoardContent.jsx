import { PageWrapper } from "@/shared/components/layout/PageTopTitle";
import { SettingBanner } from "./SettingBanner";
import styled from "@emotion/styled";

export function BoardContent({ title = "대시보드" }) {
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
