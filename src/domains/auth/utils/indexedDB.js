export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AuthDB", 1);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = () => {
      reject("IndexedDB 열기 실패");
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("AuthStore")) {
        db.createObjectStore("AuthStore", { keyPath: "id" });
      }
    };
  });
};

export const saveUserToDB = async (user, rememberMe) => {
  const db = await openDatabase();
  const transaction = db.transaction("AuthStore", "readwrite");
  const store = transaction.objectStore("AuthStore");

  const currentTime = Date.now();
  const expirationTime = rememberMe
    ? currentTime + 24 * 60 * 60 * 1000
    : currentTime + 2 * 60 * 60 * 1000;

  const userData = {
    id: "currentUser",
    ...user,
    expirationTime,
  };

  return new Promise((resolve, reject) => {
    const request = store.put(userData);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("유저 정보 저장 실패");
  });
};

export const clearUserFromDB = async () => {
  const db = await openDatabase();
  const transaction = db.transaction("AuthStore", "readwrite");
  const store = transaction.objectStore("AuthStore");

  return new Promise((resolve, reject) => {
    const request = store.delete("currentUser");

    request.onsuccess = () => resolve();
    request.onerror = () => reject("유저 정보 삭제 실패");
  });
};
