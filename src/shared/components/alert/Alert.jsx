import useAlertStore from "@/shared/hooks/useAlertStore";
import { Button } from "../buttons/Button";
import {
  AlertBody,
  AlertBottom,
  AlertClose,
  AlertContnet,
  AlertHeader,
  AlertWrapper,
} from "./AlertStyle";
const Alert = ({ children, isAlertOpen }) => {
  const { closeAlert } = useAlertStore();
  const handleAlertClose = (e) => e.stopPropagation();

  return (
    <>
      <AlertWrapper isAlertOpen={isAlertOpen} onClick={closeAlert}>
        <AlertContnet isAlertOpen={isAlertOpen} onClick={handleAlertClose}>
          <AlertHeader>
            <AlertClose onClick={closeAlert} />
          </AlertHeader>
          <AlertBody>{children}</AlertBody>
          <AlertBottom>
            <Button onClick={closeAlert} style={{ width: "100%" }}>
              확인
            </Button>
          </AlertBottom>
        </AlertContnet>
      </AlertWrapper>
    </>
  );
};
export default Alert;
