import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import parse from "html-react-parser";
import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import VerticalDotsSelect from "../community/components/ToggleBtn";
import { Button } from "@/shared/components/buttons/Button";
import { useCampaignMutations } from "./hooks/useCampaignMuations";
import { getCampaignDetail } from "@/domains/campaign/api/campaign";
import { useGetUserId } from "@/domains/auth/hooks/useGetUserId";
import useAlertStore from "@/shared/hooks/useAlertStore";
import DelAlert from "@/shared/components/alert/DelAlert";
import styled from "@emotion/styled";
import { formatDate } from "./hooks/formatDate";

export function CampaignDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const list = location?.state;
  const postSeq = list?.camPaignSeq;
  const { deleteCampaignMutation } = useCampaignMutations();
  const { userSeq, userRole } = useGetUserId();
  const isAdmin = userRole === "ADMIN";
  const { isAlertOpen, openAlert } = useAlertStore();
  const [campaignDetail, setCampaignDetail] = useState({});
  const { camPaignSeq, detail, endDate, likeCnt, writeDt, strDate, title, writerName, keyword1, keyword2, keyword3 } =
    campaignDetail || {};
  const dateTime = writeDt;
  const { formattedDate, formattedTime } = formatDate(dateTime);
  const handleGetPostDetail = useMutation({
    mutationFn: getCampaignDetail,
    onSuccess: ({ success, data }) => {
      if (success) {
        setCampaignDetail(data || {});
      }
    },
  });
  const handleEditPosting = (camPaignSeq) => navigate(`/campaignedit/${camPaignSeq}`, { state: { campaignDetail } });
  const handleConfirmDelete = () => deleteCampaignMutation.mutate(camPaignSeq);

  useEffect(() => {
    if (postSeq) handleGetPostDetail.mutate({ camPaignSeq: postSeq, userSeq: userSeq || 1 });
  }, [postSeq, userSeq]);

  return (
    <>
      {isAlertOpen && (
        <>
          <DelAlert isAlertOpen={isAlertOpen} func={handleConfirmDelete}>
            삭제하시겠습니까
          </DelAlert>
        </>
      )}
      <PageWrapper>
        <PageTop>
          <PostHeader>
            <Keywords>
              #{keyword1} #{keyword2} #{keyword3}
            </Keywords>
            <PostTitle>{title}</PostTitle>
            <PostInfo>
              <Flex>
                <p>
                  기간
                  <Mg>
                    {strDate} ~ {endDate}
                  </Mg>
                </p>
                <p>
                  <Mg>{likeCnt}</Mg> 좋아요
                </p>
              </Flex>
              <p>
                업데이트
                <Mg>{formattedDate}</Mg>
                <span> {formattedTime}</span>
              </p>
              <p>
                작성자<Mg>{writerName}</Mg>
              </p>
            </PostInfo>

            <DotsContainer>
              {isAdmin && (
                <VerticalDotsSelect
                  handleEdit={() => handleEditPosting(camPaignSeq)}
                  handleDelete={() => openAlert("post")}
                />
              )}
            </DotsContainer>
          </PostHeader>
          <ContentContainer>{parse(detail || "")}</ContentContainer>
        </PageTop>
        <BtnContainer>
          <Button style={{ width: "320px" }} onClick={() => navigate(-1)}>
            목록으로 돌아가기
          </Button>
        </BtnContainer>
      </PageWrapper>
    </>
  );
}

const PostHeader = styled.div(
  ({ theme }) => `
  text-align: left;
  width: 100%;
  border-bottom: 1px solid ${theme.colors.neutrals_04};
  padding-bottom: 8px;
  position: relative;
`
);
const PostTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 8px;
`;
const PostInfo = styled.p(
  ({ theme }) => `
  color: ${theme.colors.neutrals_02};
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  `
);
const Mg = styled.span`
  margin-left: 10px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContentContainer = styled.div(
  ({ theme }) => `
  text-align: left;
  padding-bottom: 48px;
  padding-top: 48px;
  border-bottom: 1px solid ${theme.colors.neutrals_04};
  margin-bottom: 48px;
`
);
const BtnContainer = styled.div`
  margin-top: 80px;
  margin-bottom: 100px;
`;
const DotsContainer = styled.div`
  margin-top: 16px;
  position: absolute;
  right: 0;
  top: -36px;
`;
const Keywords = styled.span(
  ({ theme }) => `
  color: ${theme.colors.primary_blue};
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: left;
  margin-bottom: 4px;
  display: inline-block
`
);
