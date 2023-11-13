<template>
  <div class="note">
    <div class="hud"></div>
    <div class="textarea-wrapper">
      <textarea class="textarea"></textarea>
    </div>
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 350px;
  height: 150px;

  border-radius: 15px;

  background-color: #4682b4;

  overflow: hidden;
}

.hud {
  width: 100%;
  height: 30px;

  margin-bottom: 4px;

  background-color: #fa8072;
}

.textarea-wrapper {
  padding: 4px 8px;
}

.textarea {
  width: 100%;
  height: 100px;

  padding: 8px;

  resize: none;

  font-size: 16px;

  border-radius: 4px;
  outline: none;

  border-color: #66cdaa;
  background-color: transparent;
  color: #fff;
}
</style>
