import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

import { useState, useEffect } from "react";

export const firebaseConfig = {
  apiKey: "AIzaSyCylVMQ8skoJhJcs6S4GLphwNsGt66ywP4",
  authDomain: "trackease-77287.firebaseapp.com",
  projectId: "trackease-77287",
  storageBucket: "trackease-77287.appspot.com",
  messagingSenderId: "738747051739",
  appId: "1:738747051739:web:f6530f6e4dc0a3708ee6fe"
};


export const app = initializeApp(firebaseConfig)