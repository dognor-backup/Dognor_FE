import UserInfoCard from "@/domains/user/components/UserInfoCard";
import { useGetUserInfo } from "@/domains/user/hooks/useGetUserInfo";
import { PageTop } from "@/shared/components/layout/PageTopTitle";
import styled from "@emotion/styled";

export default function IndividualUser() {
  const { data: userData } = useGetUserInfo();
  console.log(userData);

  const { name, phone, email } = userData.data || {};

  return (
    <IndividualUserLayout>
      <PageTop>
        <h2>MY PAGE</h2>
      </PageTop>
      <UserInfoCard name={name} phone={phone} email={email} />
    </IndividualUserLayout>
  );
}

const IndividualUserLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 36px;
  gap: 80px;
`;
