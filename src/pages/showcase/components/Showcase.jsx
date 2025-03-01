import { Button } from "@/shared/components/buttons/Button";
import { PageTop } from "@/shared/layout/PageTopTitle";
import styled from "@emotion/styled";
import ShowcaseSection from "./ShowcaseSection";
import useModalStore from "@/shared/hooks/useModalStore";

import useUserStore from "@/domains/auth/store/useUserStore";
import { useNavigate } from "react-router-dom";
import HonorDogSection from "./HonorDogSection";
import DonationStoryModal from "./DonationStoryModal";

export default function Showcase() {
  const { openModal } = useModalStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleWriteButtonClick = () => {
    if (!user?.userData?.userSeq) {
      navigate("/login", { state: { redirect: "/showcase" } });
      return;
    }

    openModal("donationStory");
  };

  return (
    <ShowcaseLayout>
      <PageTop>
        <h2>우리들의 헌혈 동료</h2>
        <ShowcaseDescription>
          우리 강아지가 다른 친구들을 살리는 멋진일을 했어요
          <br /> 여러분도 참여하고 칭찬해주세요
        </ShowcaseDescription>
      </PageTop>
      <Button
        variant="secondary"
        size="medium"
        state="default"
        style={{ width: "320px" }}
        onClick={handleWriteButtonClick}
      >
        헌혈 이야기 작성하기
      </Button>
      <ShowcaseSection />
      <HonorDogSection />
      <DonationStoryModal />
    </ShowcaseLayout>
  );
}

const ShowcaseLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;

const ShowcaseDescription = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;
