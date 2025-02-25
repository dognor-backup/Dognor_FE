import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import { SettingBanner } from "./SettingBanner";

export function BoardContent({ title }) {
  return (
    <PageWrapper>
      <PageTop>
        <h2>{title}</h2>
      </PageTop>
      <SettingBanner />
    </PageWrapper>
  );
}
