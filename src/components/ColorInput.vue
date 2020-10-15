<template>
  <transition
    name="fade"
    mode="out-in"
    v-on:after-leave="copyInputTextToClipboard"
    v-if="color">
    <div class="instructions" :key="color">
      <input
        title="ColorInput"
        type="text"
        name="colorInput"
        ref="colorInput"
        readonly
        v-on:dblclick="copyInputTextToClipboard"
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
  color: string | null = getRandomColor();

  mounted() {
    document.addEventListener("paste", this.handlePaste);
  }

  beforeDestroy() {
    document.removeEventListener("paste", this.handlePaste);
  }

  copyInputTextToClipboard() {
    setTimeout(() => {
      if (this.$refs.colorInput) {
        (this.$refs.colorInput as HTMLInputElement).select();
        document.execCommand("copy");
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
  font-size: 4rem;
  font-weight: 800;
  border: none;
  background: none;
  text-align: center;
}
</style>
