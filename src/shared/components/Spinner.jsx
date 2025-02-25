import styled from "@emotion/styled";
import { useIsFetching } from "@tanstack/react-query";

export function Spinner() {
  const isFetching = useIsFetching();
  const display = isFetching ? "flex" : "none";
  return (
    <LoadingWrapper display={display}>
      <LoadingContainer>
        {[...Array(5)].map((_, i) => (
          <SpinItem key={i} delay={`${i * 0.5}s`} />
        ))}
      </LoadingContainer>
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div(
  ({ display }) => `
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${display};
  align-items: center;
  justify-content: center;
  z-index: 10;
  overflow: hidden;
`
);
const LoadingContainer = styled.div`
  width: 320px;
  display: flex;
  gap: 16px;
  justify-content: center;
`;
const SpinItem = styled.span`
  display: inline-block;
  width: 40px;
  height: 40px;
  animation: fadeColor 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
  animation-delay: ${(props) => props.delay};

  @keyframes fadeColor {
    0% {
      background-image: url("/src/assets/icons/spinner/foot01.svg");
    }
    100% {
      background-image: url("/src/assets/icons/spinner/foot02.svg");
    }
  }
`;
