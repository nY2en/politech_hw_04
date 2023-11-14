import { createStore } from "vuex";

import { initializeApp } from "firebase/app";
import {
  getDocs,
  collection,
  // getDoc,
  doc,
  deleteDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

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

export default createStore({
  state: {
    notes: [],
  },

  getters: {},

  mutations: {
    setNotes(state, data) {
      state.notes.push(data);
    },

    updateNote(state, data) {
      const { idx, noteToUpdate } = data;
      state.notes[idx] = noteToUpdate;
    },

    deleteNote(state, data) {
      const idx = state.notes.findIndex((el) => el.id === data.id);
      state.notes.splice(idx, 1);
    },
  },

  actions: {
    fetchNotes({ commit }) {
      getDocs(collection(DB, "Notes")).then((res) =>
        res.forEach((el) => commit("setNotes", el.data()))
      );
    },

    addNote({ commit }, data) {
      setDoc(doc(DB, "Notes", `${data.id}`), { ...data });
      commit("setNotes", data);
    },

    updateNote({ commit, state }, data) {
      if (state.notes[data.idx]) {
        setDoc(doc(DB, "Notes", `${data.noteToUpdate.id}`), {
          ...data.noteToUpdate,
        });
        commit("updateNote", data);
      }
    },

    deleteNote({ commit }, data) {
      deleteDoc(doc(DB, "Notes", `${data.id}`));
      commit("deleteNote", data);
    },
  },
});
