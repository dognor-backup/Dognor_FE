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
      <IndividualUserHeaderContainer>
        <IndividualUserHeaderTitleText>
          반려견 정보
        </IndividualUserHeaderTitleText>
        <IndividualUserHeaderContentText>
          4마리의 반려견과 함께하고 있습니다
        </IndividualUserHeaderContentText>
      </IndividualUserHeaderContainer>
    </IndividualUserLayout>
  );
}

const IndividualUserLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 36px;
  gap: 80px;
`;

const IndividualUserHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 16px;
`;

const IndividualUserHeaderTitleText = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const IndividualUserHeaderContentText = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;
