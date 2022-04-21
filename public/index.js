import { auth, storage } from "firebase";
import { initializeApp } from "./firebase-app.js";
import admin from "firebase-admin";

import { auth as _auth } from "firebaseui";

import serviceAccount from "robinmahieucv-firebase-adminsdk-aldtv-c20d2b126a.json";

import firebase from "firebase";
require("firebase/auth");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
