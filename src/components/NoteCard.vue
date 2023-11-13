<template>
  <div class="note">
    <div class="hud"></div>
    <textarea
      class="textarea"
      :value="note.text"
      @input="(e) => $emit('handleText', e.target.value)"
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
};
</script>

<style>
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

  cursor: pointer;

  background-color: #fa8072;
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
</style>
