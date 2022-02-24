<template>
  <v-btn-toggle dense mandatory v-model="select">
    <v-btn
      v-for="(item, index) in items"
      v-bind:key="index"
      v-bind:value="item"
      v-on:click="(event) => click(event, index, item)"
      >{{ item }}</v-btn
    >
  </v-btn-toggle>
</template>

<script>
export default {
  name: "TabGroup",
  props: {
    value: { default: "", type: String },
    items: { default: null, type: Array },
  },
  data: () => ({
    select: "",
  }),
  watch: {
    value(v) {
      this.select = v;
    },
  },
  created() {
    if (this.items) this.select = this.items[0];
  },
  methods: {
    click(event, index, select) {
      this.$emit("click", index, select);
    },
  },
};
</script>

<style lang="scss"></style>
