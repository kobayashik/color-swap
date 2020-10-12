<template>
  <span class="error-message" v-if="hasError">:( Try again</span>

  <input
    v-else
    title="ColorInput"
    type="text"
    name="colorInput"
    ref="colorInput"
    readonly
    v-on:dblclick="copyInputTextToClipboard"
    v-on:click="copyInputTextToClipboard"
    :style="inputStyle"
    :value="color"
  />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { fromString } from "css-color-converter";

export default class ColorInput extends Vue {
  color = "#9bf6ff";
  hasError = false;

  inputStyle = {
    color: this.color
  };

  mounted() {
    document.addEventListener("paste", this.handlePaste);
  }

  beforeDestroy() {
    document.removeEventListener("paste", this.handlePaste);
  }

  copyInputTextToClipboard() {
    (this.$refs.colorInput as HTMLInputElement).select();
    document.execCommand("copy");
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

      console.log(this.color);

      this.hasError = false;
    } catch (err) {
      this.hasError = true;
      console.log(err);
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
