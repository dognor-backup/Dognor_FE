import styled from "@emotion/styled";

export function LinkCard({ background, title, btnText, color, btnColor }) {
  return (
    <Card background={background} border>
      <CardTitle color={color}>{title}</CardTitle>
      <CardBtn btnColor={btnColor}>{btnText}</CardBtn>
    </Card>
  );
}

export function TextCard({ color, title, text }) {
  return (
    <Card color={color}>
      <CardTitle>{title}</CardTitle>
      <CardText>{text}</CardText>
    </Card>
  );
}
export function WideCard({ background, title, btnText, color, btnColor }) {
  return (
    <CardLong background={background}>
      <CardTitle color={color}>{title}</CardTitle>
      <CardBtn btnColor={btnColor} noBtm>
        {btnText}
      </CardBtn>
    </CardLong>
  );
}

const Card = styled.div(
  ({ background, color, border }) => `
  background: url(${background});
  background-size: cover;
  background-position: center;
  background-color: ${color};
  text-align: center;
  padding: 56px 24px;
  border-radius: 16px;
  position: relative;
  border: ${border ? "2px solid #4A3AFF" : "none"};
  cursor: pointer
`
);
const CardLong = styled.div(
  ({ background, theme }) => `
  background: url(${background});
  height: 170px;
position: relative;
padding: 24px 0 ;
background-repeat: no-repeat;
 background-position: center;
 border-radius: 16px;
 background-size: cover;
   cursor: pointer;
   border: 2px solid ${theme.colors.point_orange};
   margin : 24px 0;
`
);
const CardTitle = styled.div(
  ({ theme, color }) => `
  font-size: 24px;
  color: ${color ? color : theme.colors.neutrals_08};
  line-height: 34px;
  font-weight: 700;

`
);
const CardText = styled.p(
  ({ theme }) => `
  font-size: 14px;
  color: ${theme.colors.neutrals_08};
  line-height: 20px;
  margin-top : 40px;
  font-weight: 700;
  white-space: pre-line;
`
);
const CardBtn = styled.button(
  ({ theme, btnColor, noBtm }) => `
background-color: ${
    btnColor === "red"
      ? theme.colors.point_orange
      : btnColor === "white"
      ? theme.colors.neutrals_08
      : theme.colors.primary_purple
  };
font-size: 16px;
color:${btnColor === "white" ? theme.colors.primary_purple : theme.colors.neutrals_08};
font-weight: 700;
padding: 10px 16px;
border-radius: 300px;
position: absolute;
    bottom: ${noBtm ? "32px" : "48px"};
    white-space: nowrap;
    transform: translateX(-50%);
    margin-top: 0;
`
);
