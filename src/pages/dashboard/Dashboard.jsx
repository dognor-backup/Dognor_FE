import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import { Outlet } from "react-router-dom";
import { BOARD_TITLES } from "./data/BoardData";
import { PageWrapper } from "@/shared/components/layout/PageTopTitle";

export function Dashboard() {
  return (
    <PageWrapper>
      <SubMenuBar subMenuList={BOARD_TITLES} />
      <div>dashboard</div>
      <Outlet />
    </PageWrapper>
  );
}
