import { useEffect } from "react";
import useUserStore from "@/domains/auth/store/useUserStore";
import { openDatabase, clearUserFromDB } from "@/domains/auth/utils/indexedDB";

const restoreUserFromDB = async (setUser, resetUser) => {
  const db = await openDatabase();
  const transaction = db.transaction("AuthStore", "readonly");
  const store = transaction.objectStore("AuthStore");

  return new Promise((resolve, reject) => {
    const request = store.get("currentUser");

    request.onsuccess = (event) => {
      const user = event.target.result;

      if (user) {
        const currentTime = Date.now();
        if (currentTime >= user.expirationTime) {
          clearUserFromDB();
          resetUser();
          resolve(null);
        } else {
          setUser(user);
          resolve(user);
        }
      } else {
        resolve(null);
      }
    };

    request.onerror = (event) => reject("유저 정보 로드 실패: " + event.target.error);
  });
};

const useRestoreUser = () => {
  const { setUser, resetUser } = useUserStore();

  useEffect(() => {
    restoreUserFromDB(setUser, resetUser)
      .then((user) => {
        if (user) {
          const remainingTime = user.expirationTime - Date.now();
          setTimeout(() => {
            resetUser();
            clearUserFromDB();
          }, remainingTime); 
        }
      })
      .catch((error) => console.error(error));
  }, []);
};

export default useRestoreUser;
