import { useEffect } from "react";
import useUserStore from "@/domains/auth/store/useUserStore";
import { openDatabase } from "@/domains/auth/utils/indexedDB";

const restoreUserFromDB = async (setUser) => {
  const db = await openDatabase();
  const transaction = db.transaction("AuthStore", "readonly");
  const store = transaction.objectStore("AuthStore");

  return new Promise((resolve, reject) => {
    const request = store.get("currentUser");

    request.onsuccess = (event) => {
      const user = event.target.result;
      if (user) setUser(user); 
      resolve(user);
    };

    request.onerror = (event) => reject("유저 정보 로드 실패: " + event.target.error);
  });
};

const useRestoreUser = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    restoreUserFromDB(setUser)
      .then((user) => {
        if (user) console.log("유저 정보 복원 완료:", user);
      })
      .catch((error) => console.error(error));
  }, []);
};

export default useRestoreUser;
