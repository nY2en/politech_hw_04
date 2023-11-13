<template>
  <div class="area">
    <NoteCard v-for="note in notes" :key="note.id" :note="note" />

    <button class="btn" @click="addNote">Add note</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NoteCard from "@/components/NoteCard.vue";

export default {
  components: { NoteCard },

  computed: {
    ...mapState({
      notes: "notes",
    }),
  },

  methods: {
    addNote() {
      const newNote = {
        id: Date.now(),
        coords: {
          x: 0,
          y: 0,
        },
      };

      this.$store.dispatch("addNote", newNote);
    },
  },
};
</script>

<style>
.area {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background-color: skyblue;
}

.btn {
  position: fixed;
  bottom: 1%;
  right: 1%;
  padding: 12px;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  border-radius: 12px;
  border: none;

  background-color: #fa8072;
  color: #fff;

  transition: transform 250ms linear;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }
}
</style>
