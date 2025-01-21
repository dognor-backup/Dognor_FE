export const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("AuthDB", 1);
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };
  
      request.onerror = (event) => {
        reject("IndexedDB 열기 실패: " + event.target.error);
      };
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
  
        if (!db.objectStoreNames.contains("AuthStore")) {
          db.createObjectStore("AuthStore", { keyPath: "id" });
        }
      };
    });
  };
  