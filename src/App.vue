<template>
  <div class="centered">
    <ColorInput />
    <UserInstructions />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ColorInput from "./components/ColorInput.vue";
import UserInstructions from "./components/UserInstructions.vue";

import "./assets/css/index.css";

@Options({
  components: {
    ColorInput,
    UserInstructions
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
