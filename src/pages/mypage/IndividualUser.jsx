import PatInfoCard from "@/domains/pat/components/PatInfoCard";
import MyPosts from "@/domains/dashboard/components/MyPosts";
import UserInfoCard from "@/domains/user/components/UserInfoCard";
import { useGetUserInfo } from "@/domains/user/hooks/useGetUserInfo";
import { PageTop } from "@/shared/components/layout/PageTopTitle";
import styled from "@emotion/styled";
import MyCommentReview from "@/domains/dashboard/components/MyCommentReview";

export default function IndividualUser() {
  const { data: userData } = useGetUserInfo();

  const { name, phone, email } = userData.data || {};

  return (
    <IndividualUserLayout>
      <PageTop>
        <h2>MY PAGE</h2>
      </PageTop>
      <UserInfoCard name={name} phone={phone} email={email} />
      <PatInfoCard />
      <MyPosts />
      <MyCommentReview />
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
