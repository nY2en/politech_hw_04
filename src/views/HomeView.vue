<template>
  <div class="area">
    <NoteCard v-for="note in notes" :key="note.id" :note="note" />

    <button @click="addNote">Add</button>
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

  background-color: #ffe4e1;
}
</style>
