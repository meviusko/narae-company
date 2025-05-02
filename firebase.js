// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyB00VqMZrAMXtD5K1gH6P-cvj36Hl0ibus",
  authDomain: "nrcopany.firebaseapp.com",
  projectId: "nrcopany",
  databaseURL: "https://nrcopany-default-rtdb.asia-southeast1.firebasedatabase.app",
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

// 로그인 버튼 클릭 시
window.loginWithGoogle = async function() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await set(ref(database, "users/" + user.uid), {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date().toISOString()
    });

    alert("Google 로그인 성공!");
    updateUI(user);
  } catch (error) {
    console.error("Google 로그인 실패:", error);
    alert("로그인 실패: " + error.message);
  }
};

// 로그인 상태 확인 및 UI 업데이트
onAuthStateChanged(auth, (user) => {
  if (user) {
    updateUI(user);
  }
});

// 로그인된 사용자 정보 표시
function updateUI(user) {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("user-info").style.display = "block";
  document.getElementById("user-name").textContent = `이름: ${user.displayName}`;
  document.getElementById("user-email").textContent = `이메일: ${user.email}`;
}

// 로그아웃
window.logout = async function () {
  await signOut(auth);
  location.reload();
};
