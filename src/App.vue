<template>
  <div class="centered" @paste="handlePaste">
    <span class="error-message" v-if="hasError">:( Try again</span>
    <span class="color" v-else :style="colorStyle">{{ color }}</span>
    <span class="instructions">
      Paste to convert from <b>HEX</b> to <b>RGB(A)</b>
    </span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { fromString } from "css-color-converter";

@Options({
  components: {
  }
})
export default class App extends Vue {
  color = "#9BF6FF";
  hasError = false;

  colorStyle = {
    color: this.color
  };

  mounted() {
    document.addEventListener("paste", this.handlePaste);
  }

  beforeDestroy() {
    document.removeEventListener("paste", this.handlePaste);
  }

  handlePaste(event: ClipboardEvent) {
    let color =
      event && event.clipboardData
        ? event.clipboardData.getData("text/plain")
        : "";
    const isHex = /#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gi.test(
      color
    );

    try {
      if (isHex) {
        color = "#" + color.replace("#", "");
        this.color = fromString(color).toRgbString();
      } else {
        this.color = fromString(color).toHexString();
      }

      this.hasError = false;
    } catch (err) {
      this.hasError = true;
      console.log(err);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Hack, source-code-pro, Consolas, monaco, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
}

body {
  background-color: #3a3d46;
}

.error-message {
  font-size: 4rem;
  color: #ea6464;
  font-weight: 600;
}

.color {
  font-size: 4rem;
  font-weight: 800;
  white-space: nowrap;
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
