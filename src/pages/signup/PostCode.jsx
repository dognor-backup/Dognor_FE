import { Input, Button, Label } from "../../shared/components/input/inputStyle";
import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "@emotion/styled";
import { useState } from "react";

export const PostCode = () => {
  const [roadAddress, setRoadAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const postcodeScriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data) => {
    setRoadAddress(data.roadAddress);
    setPostCode(data.zonecode);
  };

  const handleClick = () => open({ onComplete: handleComplete });

  return (
    <div className="mgTop32">
      <Label htmlFor="">주소</Label>
      <NoBtmMargin>
        <Input
          type="text"
          name="address"
          id="address"
          placeholder="도로명"
          value={roadAddress}
          readOnly
          onClick={handleClick}
        />
        <Button status="" onClick={handleClick}>
          주소검색
        </Button>
      </NoBtmMargin>
      <div className="mgTop16">
        <Input type="text" name="addressDetail" id="addressDetail" placeholder="상세주소" />
      </div>
      <div className="mgTop16">
        <Input
          type="text"
          name="postalCode"
          id="postalCode"
          placeholder="우편번호"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
        />
      </div>
    </div>
  );
};
export default PostCode;

const NoBtmMargin = styled.div`
  display: flex;
  margin-top: 10px;
`;
