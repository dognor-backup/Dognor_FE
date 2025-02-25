import { PageTop } from "@/shared/components/layout/PageTopTitle";
import { SettingBanner } from "./SettingBanner";

export function BoardContent({ title }) {
  return (
    <div>
      <PageTop>
        <h2>{title}</h2>
      </PageTop>
      <SettingBanner />
    </div>
  );
}
