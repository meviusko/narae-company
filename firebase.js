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

// Firebase 데이터 읽기
const dbRef = ref(db, "test");
get(dbRef).then((snapshot) => {
  const value = snapshot.val();
  const outputEl = document.getElementById("firebase-output");
  if (outputEl) {
    if (value) {
      outputEl.innerText = `Firebase: ${value}`;
    } else {
      outputEl.innerText = "";  // 데이터 없을 땐 아무것도 출력 안 함
    }
  }
}).catch((error) => {
  console.error("Firebase 데이터 가져오기 실패:", error);
}); 