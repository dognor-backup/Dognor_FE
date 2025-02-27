import styled from "@emotion/styled";

export function Tag({ color, children }) {
  return (
    <HashTag color={color}>
      <HashText color={color}># {children}</HashText>
    </HashTag>
  );
}

const HashTag = styled.span(
  ({ theme, color }) => `
  display: inline-block;
  background-color: ${color === "red" ? theme.colors.point_orange_light_100 : theme.colors.blue_light_100};
  padding: 10px 30px;
  border-radius : 30px;
  border: 1px solid ${color === "red" ? theme.colors.point_orange_light_300 : theme.colors.blue_light_300};
  margin: 8px 5px ;
`
);

const HashText = styled.p(
  ({ theme, color }) => `
  color: ${color === "red" ? theme.colors.point_orange_dark_300 : theme.colors.primary_blue};
  font-size : 16px;
  font-weight: 700
  `
);
