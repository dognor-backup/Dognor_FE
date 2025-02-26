import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import { Outlet } from "react-router-dom";
import { BOARD_TITLES } from "./data/BoardData";
import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";

export function Dashboard() {
  return (
    <PageWrapper>
      <PageTop>
        <SubMenuBar subMenuList={BOARD_TITLES} />
      </PageTop>
      <Outlet />
    </PageWrapper>
  );
}
