<template>
  <v-btn-toggle dense background-color="#a0a0a0" dark>
    <v-btn
      v-for="(item, index) in items"
      :key="index"
      :value="item"
      :disabled="options && options[index] && options[index].disabled"
      @click="(event) => click(event, index, item)"
    >
      <v-icon>{{ item }}</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "ButtonGroup",
  props: {
    items: { type: Array, default: null },
    options: { type: Array, default: null },
  },
  data: () => ({
    select: "",
  }),
  watch: {
    options(value) {
      // console.dir(value);
    },
  },
  created() {},
  methods: {
    click(event, index, select) {
      this.$emit("click", index, select, event);
    },
  },
};
</script>

<style lang="scss"></style>
