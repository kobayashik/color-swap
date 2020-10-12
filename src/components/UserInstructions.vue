<template>
  <span class="instructions">
    Paste to convert from <b>HEX</b> to <b>RGB(A)</b>
  </span>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class UserInstructions extends Vue {}
</script>

<style scoped lang="scss">
  .instructions {
    color: #f8f8f2;
    user-select: none;
  }
</style>
