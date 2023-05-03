import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREABSE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addLeaderboardEntry = async (user, wpm, accuracy) => {
    try {
        const docRef = await addDoc(collection(db, "leaderboard"), {
            [user]: {
                wpm: wpm,
                accuracy: accuracy,
            },
        });
        return docRef.id;
    } catch (e) {
        return null;
    }
}

const getLeaderboard = async () => {
    const leaderboard = [];
    const querySnapshot = await getDocs(collection(db, "leaderboard"));
  
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const user = Object.keys(data)[0];
        const wpm = data[user].wpm;
        const accuracy = Math.round(data[user].accuracy * 100) / 100;
        leaderboard.push({ user, accuracy, wpm });
    });
  
    // Sort the leaderboard by wpm in descending order
    leaderboard.sort((a, b) => b.wpm - a.wpm);
  
    // Assign ranks based on the position in the sorted list
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });
  
    return leaderboard;
  };
  

export { addLeaderboardEntry, getLeaderboard };