// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyB00VqMZrAMXtD5K1gH6P-cvj36Hl0ibus",
  authDomain: "nrcopany.firebaseapp.com",
  databaseURL: "https://nrcopany-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nrcopany",
  storageBucket: "nrcopany.firebasestorage.app",
  messagingSenderId: "869162796484",
  appId: "1:869162796484:web:0cc702d188090aeedc1091",
  measurementId: "G-105X4NDLJ8"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// 데이터베이스 참조 가져오기 함수
export const getData = async (path) => {
  try {
    const dataRef = ref(db, path);
    const snapshot = await get(dataRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error("데이터 가져오기 에러:", error);
    throw error;
  }
};

// Firebase 인스턴스 내보내기
export { app, analytics, db }; 