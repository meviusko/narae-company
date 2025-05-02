// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDqQqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXq",
  authDomain: "narae-company.firebaseapp.com",
  databaseURL: "https://narae-company-default-rtdb.firebaseio.com",
  projectId: "narae-company",
  storageBucket: "narae-company.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqrstuv",
  measurementId: "G-ABCDEFGHIJ"
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