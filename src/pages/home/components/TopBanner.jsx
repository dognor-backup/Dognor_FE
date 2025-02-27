import styled from "@emotion/styled";
import { useBannerMutations } from "@/pages/dashboard/hooks/useBanner";

//배너수만큼 circleBtn 자동 생성
export function TopBanner() {
  const { getBannerQuery } = useBannerMutations();
  const { data: bannerList, isLoading, isError } = getBannerQuery;
  console.log(bannerList);
  // const bannerImages = bannerList?.data.slice(-4);

  return (
    <MainBanner>
      <BannerBtnLeft />
      {/* {bannerImages?.map((banner, index) => {
        const { bannerSeq, strDt, endDt, link, memo, mobileImgUrl, webImgUrl } = banner;
        return <BannerImg key={index} src={webImgUrl} />;
      })} */}
      <BannerBtnRight />
      <BannerBtns>
        <CircleBtn isActive />
        <CircleBtn />
        <CircleBtn />
        <CircleBtn />
      </BannerBtns>
    </MainBanner>
  );
}

const MainBanner = styled.div`
  height: 480px;
  max-height: 480px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BannerBtns = styled.div`
  position: absolute;
  bottom: 24px;
  display: flex;
  gap: 16px;
  justify-content: center;
`;
const CircleBtn = styled.button(
  ({ isActive, theme }) => `
  width:12px;
  height: 12px;
  background-color:${isActive ? "#4A3AFF" : theme.colors.neutrals_08};
  border-radius: 50%;
  border: 1px solid ${theme.colors.neutrals_05}
`
);
const BannerImg = styled.img`
  height: 480px;
  max-height: 480px;
  width: 100%;
  position: absolute;
  top: 0;
  object-fit: cover;
`;

const BannerBtnLeft = styled.button`
  height: 432px;
  width: 90px;
  position: absolute;
  background-image: url("/src/assets/icons/gray/chevron_left_g.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 32px;
  left: 150px;
  z-index: 1;
`;
const BannerBtnRight = styled.button`
  height: 432px;
  width: 90px;
  background-image: url("/src/assets/icons/gray/chevron_right_g.svg");
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  background-size: 32px;
  right: 150px;
  z-index: 1;
`;
