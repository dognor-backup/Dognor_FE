import React from "react";
import { LogoutBtn } from "./LogoutBtn";
import { Button } from "../buttons/Button";

export default function Nav() {
  return (
    <div>
      <div>
        <p>헌혈하개</p>
        <div>
          <LogoutBtn>로그아웃</LogoutBtn>
          <Button variant="normal" size="medium" state="outline">
            마이페이지
          </Button>
        </div>
      </div>
    </div>
  );
}
