import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-uPTSNM8N1u8lBsZ6P4eKG2bsxqgdsE0",
  authDomain: "skillswap-c592a.firebaseapp.com",
  projectId: "skillswap-c592a",
  storageBucket: "skillswap-c592a.firebasestorage.app",
  messagingSenderId: "1055833294593",
  appId: "1:1055833294593:web:19e1646402f0fc76ea3d00",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const googleBtn = document.getElementById("googleBtn");
const errorEl = document.getElementById("formError");

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.add("show");
}

googleBtn.addEventListener("click", async () => {
  errorEl.classList.remove("show");
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem(
      "skillswapUser",
      JSON.stringify({ uid: user.uid, name: user.displayName, email: user.email, photo: user.photoURL })
    );
    alert("Welcome, " + user.displayName + "!");
  } catch (err) {
    if (err.code === "auth/popup-closed-by-user") return;
    showError("Google sign-in failed: " + err.code);
  }
});