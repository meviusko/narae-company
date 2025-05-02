// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyB00VqMZrAMXtD5K1gH6P-cvj36Hl0ibus",
  authDomain: "nrcopany.firebaseapp.com",
  projectId: "nrcopany",
  databaseURL: "https://nrcopany-default-rtdb.firebaseio.com",
  storageBucket: "nrcopany.appspot.com",
  messagingSenderId: "869162796484",
  appId: "1:869162796484:web:0cc702d188090aeedc1091",
  measurementId: "G-105X4NDLJ8"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

// 데이터베이스에서 데이터 읽기
const dbRef = ref(database, "test");
get(dbRef).then((snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    document.getElementById("firebase-output").innerHTML = JSON.stringify(data);
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

// Google 로그인
window.loginWithGoogle = async function() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google 로그인 성공:", user);
    alert("Google 로그인 성공!");
    hideLoginForm();
  } catch (error) {
    console.error("Google 로그인 실패:", error);
    alert("Google 로그인 실패: " + error.message);
  }
}; 