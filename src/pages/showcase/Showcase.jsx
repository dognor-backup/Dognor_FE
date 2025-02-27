import { Button } from "@/shared/components/buttons/Button";
import { PageTop } from "@/shared/layout/PageTopTitle";
import styled from "@emotion/styled";
import ShowcaseSection from "./ShowcaseSection";
import useModalStore from "@/shared/hooks/useModalStore";
import DonationStoryModal from "./DonationStoryModal";

export default function Showcase() {
  const { openModal } = useModalStore();

  const handleOpenDonationStoryModal = () => {
    openModal("donationStory");
  };

  return (
    <ShowcaseLayout>
      <PageTop>
        <h2>우리들의 헌혈 동료</h2>
        <ShowcaseDescription>
          우리 강아지가 다른 친구들을 살리는 멋진일을
          <br /> 했어요 여러분도 참여하고 칭찬해주세요
        </ShowcaseDescription>
      </PageTop>
      <Button
        variant="secondary"
        size="medium"
        state="default"
        style={{ width: "320px" }}
        onClick={handleOpenDonationStoryModal}
      >
        헌혈 이야기 작성하기
      </Button>
      <ShowcaseSection />
      <DonationStoryModal />
    </ShowcaseLayout>
  );
}

const ShowcaseLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding: 0 36px 100px 36px;
`;

const ShowcaseDescription = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;
