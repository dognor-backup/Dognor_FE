import styled from "@emotion/styled";

export const TextareaForm = ({
  id,
  name,
  placeholder,
  label,
  rows = 3,
  maxLength,
  status = "normal",
  infoMessage,
  getInputValue,
  value,
  ...props
}) => {
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    getInputValue({ name, value });
  };

  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <TextareaContainer>
        <StyledTextarea
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={handleInputValue}
          value={value}
          rows={rows}
          maxLength={maxLength}
          status={status}
          {...props}
        />
      </TextareaContainer>
      <Info status={status}>{infoMessage}</Info>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const TextareaContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.neutrals_07};
  border: 1px solid
    ${({ theme, status }) =>
      status === "error" ? theme.colors.point_red : theme.colors.neutrals_05};
  border-radius: 6px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.neutrals_01};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutrals_03};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary_blue};
  }
`;

const Info = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme, status }) =>
    status === "error" ? theme.colors.point_red : theme.colors.neutrals_03};
`;
