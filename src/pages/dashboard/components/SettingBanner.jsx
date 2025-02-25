import { BannerSettingCard } from "./BannerSettingCard";
import Banner1 from "/src/assets/icons/number/banner_num_1.svg?react";
import Banner2 from "/src/assets/icons/number/banner_num_2.svg?react";
import Banner3 from "/src/assets/icons/number/banner_num_3.svg?react";
import Banner4 from "/src/assets/icons/number/banner_num_4.svg?react";

const bannersNumImg = [Banner1, Banner2, Banner3, Banner4];
export function SettingBanner() {
  return bannersNumImg.map((banner, idx) => <BannerSettingCard key={idx} img={banner}></BannerSettingCard>);
}
