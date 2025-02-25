import useAlertStore from "@/shared/hooks/useAlertStore";
import { Button } from "../buttons/Button";
import { AlertBody, AlertBottom, AlertClose, AlertContnet, AlertHeader, AlertIcon, AlertWrapper } from "./AlertStyle";
const DelAlert = ({ children, isAlertOpen, func }) => {
  const { closeAlert } = useAlertStore();
  const handleAlertClose = (e) => e.stopPropagation();
  const handleDelete = () => {
    if (func) func();
  };
  return (
    <>
      <AlertWrapper isAlertOpen={isAlertOpen} onClick={closeAlert}>
        <AlertContnet isAlertOpen={isAlertOpen} onClick={handleAlertClose}>
          <AlertHeader>
            <AlertClose onClick={closeAlert} />
          </AlertHeader>
          <AlertIcon>!</AlertIcon>
          <AlertBody>{children}</AlertBody>
          <AlertBottom flex>
            <Button onClick={closeAlert} variant="primary" state="outline" style={{ width: "100%" }}>
              취소
            </Button>
            <Button
              onClick={() => {
                handleDelete();
                closeAlert();
              }}
              style={{ width: "100%" }}
            >
              확인
            </Button>
          </AlertBottom>
        </AlertContnet>
      </AlertWrapper>
    </>
  );
};
export default DelAlert;
