import { useNavigate } from "react-router-dom";
import { useGetCampaigns } from "@/domains/campaign/hooks/useGetCampaigns";
import { useCampaignMutations } from "./hooks/useCampaignMuations";
import { useGetUserId } from "@/domains/auth/hooks/useGetUserId";
import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import { Button } from "@/shared/components/buttons/Button";
import TagCard from "@/shared/components/cards/tagcard/TagCard";
import { DnPagination } from "@/pages/community/components/DnPagination";
import { Spinner } from "@/shared/components/Spinner";
import Bannner from "/src/assets/images/Campaigns_01.png?react";
import styled from "@emotion/styled";

export default function Campaigns() {
  const navigate = useNavigate();
  const { userRole, userSeq } = useGetUserId();
  const { data: campaignList, isLoading } = useGetCampaigns({ userSeq: userSeq ?? 1, page: 1, size: 9 });
  const campaign = campaignList?.data;
  const isAdmin = userRole === "ADMIN";
  const { likeCampaignMutation } = useCampaignMutations();
  const handleLinkToCampaignDetail = (camPaignSeq) => navigate(`/campaign/${camPaignSeq}`, { state: { camPaignSeq } });

  if (isLoading) {
    <Spinner />;
  }
  return (
    <>
      <Banner src={Bannner}></Banner>
      <PageWrapper>
        <PageTop noNav={true}>
          <h2>캠페인</h2>
          <p>
            우리 강아지가 다른 친구들을 함께하는 캠페인과 이벤트
            <br /> 그리고 다양한 소식을 전한는 공간입니다.
          </p>
        </PageTop>
        {campaign?.length === 0 ? (
          <NoPromotion>
            <p>
              곧 새로운 이벤트와 프로모션으로 찾아뵙겠습니다. <br />
              그때 까지 잠시 기다려주세요 :)
            </p>
          </NoPromotion>
        ) : (
          <>
            <CardWrapper>
              {campaign?.map((list) => (
                <TagCard
                  key={list?.camPaignSeq}
                  campaign={list}
                  onClick={() => handleLinkToCampaignDetail(list?.camPaignSeq)}
                  likeCampaignMutation={likeCampaignMutation.mutate}
                />
              ))}
            </CardWrapper>
            <DnPagination></DnPagination>
          </>
        )}
        <BtnContainer>
          {isAdmin && (
            <Button onClick={() => navigate("/campaigns/postnew")} variant="secondary" style={{ width: "320px" }}>
              글 작성하기
            </Button>
          )}
          <Button onClick={() => navigate("/home")} variant="secondary" state="outline" style={{ width: "320px" }}>
            홈으로 돌아가기
          </Button>
        </BtnContainer>
      </PageWrapper>
    </>
  );
}

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 48px;
`;
const Banner = styled.img`
  margin-top: 130px;
  height: 220px;
  width: 100%;
`;
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 0 auto;
  margin-top: 48px;
`;
const NoPromotion = styled.div(
  ({ theme }) => `
  width: 100%;
  height: 260px;
  display: flex;
  line-height: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid ${theme.colors.primary_blue};
  border-radius: 16px;
  box-shadow: ${theme.shadow};
  margin-top: 80px;
  color: ${theme.colors.primary_purple};
  font-weight: 700
`
);
