<template>
  <div id="vue-event">
    <div class="item">
      <label>keyup: <input type="text" name="" value="" @keyup="keyUp($event)"></label>
    </div>
    <div class="item">
      <label>keyup.up: <input type="text" name="" value="" @keyup.up="upUp($event)"></label>
    </div>
    <div class="item">
      <label>keyup.down<input type="text" name="" value="" @keyup.down="upDown($event)"></label>
    </div>
    <div class="item">
      <label>keyup.enter<input type="text" name="" value="" @keyup.enter="search($event)"></label>
    </div>
    <div class="item">
      <label>keydown<input type="text" name="" value="" @keydown="keyDown($event)"></label>
    </div>
    <div class="item">
      <label>keydown.left<input type="text" name="" value="" @keydown.left="downUp($event)"></label>
    </div>
    <div class="item">
      <label>keydown.down<input type="text" name="" value="" @keydown.down="downDown($event)"></label>
    </div>
    <div class="item">
      <label>keydown.enter<input type="text" name="" value="" @keydown.enter="search($event)"></label>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#vue-event {
  input {
    border: 1px solid gray;
  }
}
</style>
<script>
export default {
  methods: {
    keyUp: function(ev) {
      console.log(ev.keyCode);
    },
    upUp: function(ev) {
      console.log(ev.keyCode);
    },
    upDown: function(ev) {
      console.log(ev.keyCode);
    },
    keyDown: function(ev) {
      console.log(ev.keyCode);
    },
    search: function(ev) {
      console.log(ev.keyCode);
    },
    downUp: function(ev) {
      console.log(ev.keyCode);
    },
    downDown: function(ev) {
      console.log(ev.keyCode);
    },
  }
}
</script>