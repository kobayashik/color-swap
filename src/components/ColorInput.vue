<template>
  <transition name="fade-up" mode="out-in" v-on:transitionend="hideText">
    <span
      class="no-select"
      v-if="wasCopied"
      style="position: absolute; top: -20px;"
      >Copied!</span
    >
  </transition>

  <transition
    name="fade"
    mode="out-in"
    v-on:after-leave="copyInputTextToClipboard"
    v-if="color"
  >
    <div :key="color">
      <input
        title="ColorInput"
        type="text"
        name="colorInput"
        ref="colorInput"
        readonly
        v-on:click="selectInput"
        v-on:dblclick="selectInput"
        :style="{ color: color }"
        :value="color"
      />
    </div>
  </transition>
  <span v-else class="error-message">:( Try again</span>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { fromString } from "css-color-converter";

function getRandomColor() {
  const COLORS: string[] = ["#c9f4fe", "#b2f1d8", "#fffee3", "#ffb3c8"];
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default class ColorInput extends Vue {
  wasCopied = false;
  color: string | null = getRandomColor();

  mounted() {
    document.addEventListener("paste", this.handlePaste);
    document.addEventListener("copy", this.copyInputTextToClipboard);
  }

  beforeDestroy() {
    document.removeEventListener("paste", this.handlePaste);
    document.removeEventListener("copy", this.copyInputTextToClipboard);
  }

  hideText() {
    this.wasCopied = false;
  }

  selectInput() {
    if (this.$refs.colorInput) {
      (this.$refs.colorInput as HTMLInputElement).select();
    }
  }

  copyInputTextToClipboard() {
    setTimeout(() => {
      this.selectInput();
      if (this.color) {
        navigator.clipboard.writeText(this.color).then(
          () => {
            this.wasCopied = true;
          },
          err => {
            console.error(err);
          }
        );
      }
    });
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
    } catch (err) {
      this.color = null;
    }
  }
}
</script>

<style scoped lang="scss">
.error-message {
  font-size: 4rem;
  color: #ea6464;
  font-weight: 600;
}

input {
  cursor: pointer;
  font-size: 4rem;
  font-weight: 800;
  border: none;
  background: none;
  text-align: center;
}
</style>
