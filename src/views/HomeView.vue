<template>
  <div
    class="area"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mousemove="handleMouseMove"
  >
    <NoteCard
      v-for="(note, index) in notes"
      :key="note.id"
      :note="note"
      :idx="index"
      @handleText="handleText"
    />
    <button class="btn" @click="addNote">Add note</button>
  </div>
</template>

<script>
import NoteCard from "@/components/NoteCard.vue";

export default {
  data() {
    return {
      currentNoteIdx: null,
      isAction: false,
      startCoords: {
        x: 0,
        y: 0,
      },
      currentCoords: {
        x: 0,
        y: 0,
      },
    };
  },

  mounted() {
    this.$store.dispatch("fetchNotes");
  },

  computed: {
    notes() {
      return this.$store.state.notes;
    },
  },

  methods: {
    addNote() {
      const newNote = {
        id: Date.now(),
        coords: {
          x: 0,
          y: 0,
        },
        text: "",
      };

      this.$store.dispatch("addNote", newNote);
    },

    handleMouseDown(e) {
      if (e.target.classList.contains("hud")) {
        this.isAction = true;
        this.currentNoteIdx = e.target.parentNode.getAttribute("idx");
        this.startCoords.x = e.pageX;
        this.startCoords.y = e.pageY;
      }

      if (e.target.classList.contains("textarea")) {
        this.currentNoteIdx = e.target.parentNode.getAttribute("idx");
      }
    },

    handleMouseMove(e) {
      if (this.isAction) {
        this.currentCoords.x =
          this.notes[this.currentNoteIdx].coords.x +
          (e.pageX - this.startCoords.x);

        this.currentCoords.y =
          this.notes[this.currentNoteIdx].coords.y +
          (e.pageY - this.startCoords.y);

        const areaWidth = document.querySelector(".area").offsetWidth;
        const areaHeight = document.querySelector(".area").offsetHeight;
        const noteWidth = document.querySelector(".note").offsetWidth;
        const notHeight = document.querySelector(".note").offsetHeight;

        if (this.currentCoords.x <= 0) this.currentCoords.x = 0;
        if (this.currentCoords.x >= areaWidth - noteWidth)
          this.currentCoords.x = areaWidth - noteWidth;

        if (this.currentCoords.y <= 0) this.currentCoords.y = 0;
        if (this.currentCoords.y >= areaHeight - notHeight)
          this.currentCoords.y = areaHeight - notHeight;

        document.querySelector(
          `.note[idx="${this.currentNoteIdx}"]`
        ).style.left = `${this.currentCoords.x}px`;

        document.querySelector(
          `.note[idx="${this.currentNoteIdx}"]`
        ).style.top = `${this.currentCoords.y}px`;
      }
    },

    handleMouseUp() {
      if (this.isAction) {
        this.isAction = false;
        this.notes[this.currentNoteIdx].coords.x = this.currentCoords.x;
        this.notes[this.currentNoteIdx].coords.y = this.currentCoords.y;
      }
    },

    handleText(data) {
      this.notes[this.currentNoteIdx].text = data;
    },
  },

  watch: {
    notes: {
      handler(newValue) {
        const noteToUpdate = newValue[this.currentNoteIdx];
        const idx = this.currentNoteIdx;
        this.$store.dispatch("updateNote", { noteToUpdate, idx });
      },
      deep: true,
    },
  },

  components: { NoteCard },
};
</script>

<style scoped>
.area {
  width: 100%;
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
