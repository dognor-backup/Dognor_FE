import styled from "@emotion/styled";
import { Button } from "../buttons/Button";
import useModalStore from "@/shared/hooks/useModalStore";

const Modal = ({ children, BtnText, title, size, formName, onSubmit, modalName, onClose, ...props }) => {
  const { closeModal,modalName: activeModalName } = useModalStore();
  const handleModalClick = (e) => e.stopPropagation();
  const isModalOpen = activeModalName === modalName;

  return (
    <>
      <ModalDimmed isModalOpen={isModalOpen} onClick={()=>closeModal(onClose)}>
        <ModalContainer size={size} isModalOpen={isModalOpen} onClick={handleModalClick}>
          <ModalContent>
            <ModalHeader>
              <CloseBtn onClick={()=>closeModal(onClose)} />
            </ModalHeader>
            <ModalBody>
              <form id={formName} onSubmit={onSubmit} {...props}>
                <ModalTitle>{title}</ModalTitle>
              </form>
              {children}
            </ModalBody>
            <ModalFooter>
              <Button style={{ width: "100%" }} type="submit" form={formName}>
                {BtnText}
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      </ModalDimmed>
    </>
  );
};
export default Modal;

const ModalDimmed = styled.div(
  ({ isModalOpen }) => `
  background-color: #514f6e4d;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: opacity 0.8s ease-in;
  visibility: ${isModalOpen ? "visible" : "hidden"};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(2px);
    z-index: -1;
  }
`
);
const ModalContainer = styled.div(
  ({ size, isModalOpen }) => `
  width:${size === "small" ? "320px" : "600px"};
  background-color: white;
  position: relative;
  z-index: 10;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 16px;
  box-shadow: 4px 4px 30px 0.6px #000;
  opacity: ${isModalOpen ? 1 : 0};
  transition: opacity 0.5s ease-in;
  visibility: ${isModalOpen ? "visible" : "hidden"};
`
);

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;
const ModalHeader = styled.div`
  width: 100%;
  position: relative;
  height: 24px;
`;
const ModalTitle = styled.div(
  ({ theme }) => `
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  color:  ${theme.colors.neutrals_01};
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 24px 0;
`
);
const ModalBody = styled.div`
  width: 100%;
  margin-bottom: 50px;
  min-height: 200px;
  max-height: 80vh;
  overflow-y: scroll;
`;
const ModalFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
const CloseBtn = styled.button`
  all: unset;
  width: 24px;
  height: 24px;
  background-image: url("/src/assets/icons/gray/cross_3_g.svg?react");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  display: inline-block;
  position: absolute;
  right: 0;
  cursor: pointer;
`;
