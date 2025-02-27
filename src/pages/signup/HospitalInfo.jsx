import { InputBtn } from "@/shared/components/input/InputBtn";
import { InputForm } from "@/shared/components/input/InputForm";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import PostCode from "./PostCode";
import { Label as RadioTitle } from "@/shared/components/input/inputStyle";
import useGetValueFromTextInput from "@/shared/hooks/useGetValueFromTextInput";
import { useEffect, useState } from "react";

const HospitalInfo = ({ getValueFromHospital }) => {
  const { getInputValue } = useGetValueFromTextInput();
  const [checkbox, setCheckbox] = useState({ agreementHospital: false });
  const [numberValue, setNumberValue] = useState("");
  const [isDonationPossible, setDonationPossible] = useState(0);
  const [donationPrice, setDonationPrice] = useState(0);

  const handleKeyPress = (e) => {
    // 숫자가 아닌 키를 누르면 입력 차단
    const { value } = e.target;
    if (/^[0-9]*$/.test(value)) {
      setNumberValue(value);
    }
  };

  const getCheckValues = (e) => {
    const { name, checked } = e.target;
    setCheckbox((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  useEffect(() => {
    getValueFromHospital({ ...checkbox, isDonationPossible, donationPrice });
  }, [isDonationPossible, donationPrice, checkbox]);

  return (
    <div className="mgBtm56">
      <InputForm
        className="mgTop20"
        id="hospitalName"
        name="hospitalName"
        placeholder="동물병원 상호명을 입력해주세요"
        label="병원 상호명 "
        infoMessage=""
        status="normal"
        getInputValue={getInputValue}
      />
      <InputForm
        className="mgTop20"
        id="representativeName"
        name="representativeName"
        placeholder="동물병원 대표자 성명을 입력해주세요"
        label="대표자"
        infoMessage=""
        status="normal"
        getInputValue={getInputValue}
      />
      <PostCode />
      <InputForm
        className="mgTop26"
        id="hospitalPhone"
        name="hospitalPhone"
        placeholder="전화번호를 입력해주세요"
        label="병원 전화번호"
        infoMessage=""
        status="normal"
        value={numberValue}
        getInputValue={getInputValue}
        onChange={handleKeyPress}
      />
      <div className="mgTop56">
        <div className="radioFlex">
          <RadioTitle>헌혈 가능여부</RadioTitle>
          <RadioGroup defaultValue="0" className="radioFlex" onValueChange={(value) => setDonationPossible(value)}>
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem value="0" id="donationN" />
              <Label htmlFor="donationN">불가능</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="donationY" />
              <Label htmlFor="donationY">가능</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="radioFlex mgTop26">
          <RadioTitle>헌혈 금액</RadioTitle>
          <RadioGroup defaultValue="0" className="radioFlex" onValueChange={(value) => setDonationPrice(value)}>
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem value="0" id="donationFreeN" />
              <Label htmlFor="donationFreeN">유료</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="donationFreeY" />
              <Label htmlFor="donationFreeY">무료</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="mgTop56 pdLeft48">
        <Checkbox
          name="agreementHospital"
          label="[필수] 위와 같이 입력된 동물병원 정보와 동일하며, 본 병원의 대표자 입니다."
          onChange={getCheckValues}
          checked={checkbox.agreementHospital}
        />
      </div>
    </div>
  );
};
export default HospitalInfo;
