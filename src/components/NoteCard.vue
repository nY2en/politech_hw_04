<template>
  <div
    class="note"
    :style="{ top: note.coords.y + 'px', left: note.coords.x + 'px' }"
  >
    <div class="hud">
      <button class="btn" @click="deleteNote(note)">X</button>
    </div>
    <textarea
      class="textarea"
      :value="note.text"
      @input="handleChange"
      placeholder="Type sth..."
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
  },

  methods: {
    handleChange(e) {
      this.$emit("handleText", e.target.value);
    },

    deleteNote(data) {
      console.log(data);
      this.$store.dispatch("deleteNote", data);
    },
  },
};
</script>

<style scoped>
.note {
  position: absolute;
  top: 0;
  left: 0;

  width: 350px;
  height: 150px;

  border-radius: 15px;

  background-color: #fff;

  overflow: hidden;
}

.hud {
  width: 100%;
  height: 30px;
  padding: 0 8px;

  cursor: pointer;

  background-color: #fa8072;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.textarea {
  width: 100%;
  height: 100px;
  padding: 8px;

  resize: none;

  font-size: 16px;

  outline: none;
  border: none;
  background-color: transparent;
  color: #000;
}

.btn {
  background-color: skyblue;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 15px;

  font-size: 11px;

  cursor: pointer;
}
</style>
