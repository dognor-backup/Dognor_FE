import { PageTop } from "@/shared/components/layout/PageTopTitle";
import styled from "@emotion/styled";

export default function UserAccountSettings() {
  return (
    <PageTop>
      <h2>회원정보 수정</h2>
      <UserMemberClassificationWrapper>

      </UserMemberClassificationWrapper>
    </PageTop>
  );
}

const UserMemberClassificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
