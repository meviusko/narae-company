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
window.showLoginForm = async function () {
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

    updateUI(user);
  } catch (error) {
    console.error("로그인 실패:", error);
    alert("로그인 실패: " + error.message);
  }
};

// 로그인 상태 확인
onAuthStateChanged(auth, (user) => {
  if (user) {
    updateUI(user);
  }
});

// 로그인 후 버튼 변경
function updateUI(user) {
  const btn = document.getElementById("login-btn");
  btn.textContent = "MY";
  btn.onclick = () => openModal(user);
}

// 모달 열기
function openModal(user) {
  document.getElementById("user-name").textContent = `이름: ${user.displayName}`;
  document.getElementById("user-email").textContent = `이메일: ${user.email}`;
  document.getElementById("user-modal").style.display = "block";
  document.getElementById("modal-overlay").style.display = "block";
}

// 모달 닫기
window.closeModal = function () {
  document.getElementById("user-modal").style.display = "none";
  document.getElementById("modal-overlay").style.display = "none";
};

// 로그아웃
window.logout = async function () {
  await signOut(auth);
  location.reload();
};
