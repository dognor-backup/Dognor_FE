import styled from "@emotion/styled";

export function Banner() {
  return (
    <MainBanner>
      <BannerBtnLeft />
      <BannerImg />
      <BannerBtnRight />
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
const BannerImg = styled.img`
  height: 480px;
  max-height: 480px;
  background-image: url("/src/assets/images/banner1.svg");
  background-position: center;
  background-size: cover;
  width: 100%;
  position: absolute;
  top: 0;
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
