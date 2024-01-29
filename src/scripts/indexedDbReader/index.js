// indexedDB.js
const DB_NAME = "portebP";
const STORE_NAME = "patients";

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 10);

    request.onerror = (event) => {
      reject(`Error opening database: ${event.target.error}`);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    };
  });
};

const addObject = async (object) => {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(object);

      request.onsuccess = () => {
        resolve("Object added successfully");
      };

      request.onerror = (event) => {
        reject(`Error adding object: ${event.target.error}`);
      };
    });
  });
};

const getAllObjects = async () => {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(`Error getting objects: ${event.target.error}`);
      };
    });
  });
};

export { addObject, getAllObjects };
