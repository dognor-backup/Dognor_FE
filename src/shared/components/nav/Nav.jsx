import React from "react";
import { LogoutBtn } from "./LogoutBtn";
import { Button } from "../buttons/Button";
import Logo from "../../../assets/images/logo.svg?react";
import { TopMenuBtn } from "./TopMenuBtn";
import TopMenuContainer from "./TopMenuContainer";

export default function Nav() {
  return (
    <div style={{ width: "100vw" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 36px",
        }}
      >
        <Logo />
        <div>
          <LogoutBtn>로그아웃</LogoutBtn>
          <Button variant="normal" size="medium" state="outline">
            마이페이지
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TopMenuContainer />
       
      </div>
    </div>
  );
}
