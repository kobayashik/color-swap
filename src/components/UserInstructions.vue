<template>
  <span class="instructions no-select">
    Paste to convert from
    <transition name="slide-fade" mode="out-in">
      <div class="color-types" :key="colorTypes[0]">
        <b>{{ colorTypes[0] }}</b> to <b>{{ colorTypes[1] }}</b>
      </div>
    </transition>
  </span>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class UserInstructions extends Vue {
  colorTypes = ["HEX", "RGB"];

  mounted() {
    setInterval(() => (this.colorTypes = this.colorTypes.reverse()), 4000);
  }
}
</script>

<style scoped lang="scss">
.instructions {
  margin: 0 10px;
  display: flex;
  color: #f8f8f2;
}

.color-types {
  margin: 0 10px;
}
</style>
