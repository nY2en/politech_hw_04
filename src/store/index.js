import { createStore } from "vuex";

import { initializeApp } from "firebase/app";
import {
  getDocs,
  collection,
  // getDoc,
  // doc,
  // deleteDoc,
  // getFirestore,
  // setDoc
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABgWLVznaisP8g3bnsM9Xb5h31nam8eCs",
  authDomain: "web-notes-16ffd.firebaseapp.com",
  projectId: "web-notes-16ffd",
  storageBucket: "web-notes-16ffd.appspot.com",
  messagingSenderId: "46492227454",
  appId: "1:46492227454:web:c014ad7c6a5b21675e052f",
  measurementId: "G-67FECBNGTK",
};

const APP = initializeApp(firebaseConfig);

const DB = getFirestore(APP);

DB;

// function getDocFromDb(c, d) {
//   return getDoc(doc(DB, c, d));
// }

// function getCollectionFromDb(c) {
//   return getDocs(collection(DB, c));
// }

// getDocFromDb("Notes", "jjKkSbvtpNBlOK3uSEYA").then((res) =>
//   console.error(res.data())
// );

// getCollectionFromDb("Notes").then((res) =>
//   res.forEach((el) => console.log(el.data()))
// );

export default createStore({
  state: {
    notes: [],
  },

  getters: {},

  mutations: {
    setNotes(state, data) {
      state.notes = data;
    },

    setFetchedNotes(state, data) {
      state.notes.push(data);
    },
  },

  actions: {
    fetchNotes({ commit }) {
      getDocs(collection(DB, "Notes")).then((res) =>
        res.forEach((el) => commit("setFetchedNotes", el.data()))
      );
    },

    addNote({ commit }, data) {
      commit("setNotes", data);
    },

    updateNote({ commit }, data) {
      commit("setNotes", data);
    },
  },
});
