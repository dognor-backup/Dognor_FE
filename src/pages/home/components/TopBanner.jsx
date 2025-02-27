import { useEffect, useState } from "react";
import { useBannerMutations } from "@/pages/dashboard/hooks/useBanner";
import styled from "@emotion/styled";

export function TopBanner() {
  const { getBannerQuery } = useBannerMutations();
  const { data: bannerList } = getBannerQuery;
  const [prevBanners, setPrevBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  let len = prevBanners?.length || 0;

  useEffect(() => {
    if (bannerList) {
      setPrevBanners(bannerList?.data);
    }
  }, [prevBanners]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleCurrentBanner("next");
    }, 5000);
    return () => clearInterval(interval);
  }, [prevBanners]);

  const handleCurrentBanner = (btnType) => {
    switch (btnType) {
      case "prev":
        setCurrentBanner((prev) => (prev - 1 + len) % len);
        break;
      case "next":
        setCurrentBanner((prev) => (prev + 1) % len);
        break;
      case "dot":
        setCurrentBanner(index);
        break;
      default:
        break;
    }
  };

  return (
    <MainBanner>
      <BannerBtnLeft onClick={() => handleCurrentBanner("prev")} />
      {prevBanners?.map((banner, index) => (
        <BannerImg key={index} src={banner.webImgUrl} className={currentBanner === index ? "active" : ""} />
      ))}
      <BannerBtnRight onClick={() => handleCurrentBanner("next")} />
      <BannerBtns>
        {Array.from({ length: len || 0 }).map((_, index) => (
          <CircleBtn key={index} isActive={currentBanner === index} onClick={() => handleCurrentBanner("dot")} />
        ))}
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
//현재번째 이미지만 보이기
const BannerImg = styled.img`
  height: 480px;
  max-height: 480px;
  width: 100%;
  position: absolute;
  top: 0;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  &.active {
    opacity: 1;
  }
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
