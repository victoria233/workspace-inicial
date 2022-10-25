  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBfDBXl0ECg8OOqiKV0gDemqtJT1QQY0NY",
    authDomain: "victoria233-workspace-inicial.firebaseapp.com",
    projectId: "victoria233-workspace-inicial",
    storageBucket: "victoria233-workspace-inicial.appspot.com",
    messagingSenderId: "927060644659",
    appId: "1:927060644659:web:633754ecd531ab8bfde446"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);



  import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";

  const provider = new GoogleAuthProvider();


  import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});



/* project-927060644659 */