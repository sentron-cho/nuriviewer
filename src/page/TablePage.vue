<template>
  <v-container fluid>
    <v-data-table
      dense
      v-model="selected"
      :headers="headers"
      :items="items"
      hide-default-footer
      disable-pagination
      class="elevation-1 u-table"
      item-key="Key"
      single-select
      disable-sort
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="remove(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "TablePage",

  components: {},
  props: {
    event: { type: String, default: "none" },
    data: { type: Object, default: null },
  },
  data: () => ({
    headers: [
      {
        text: global.$lang.action,
        value: "actions",
        class: "t-btn",
        width: "60px",
        align: "center",
      },
      { text: global.$lang.no, value: "no", width: "60px", align: "center" },
      { text: global.$lang.name, value: "name", width: "260px" },
      { text: global.$lang.age, value: "age" },
      { text: global.$lang.kor, value: "kor" },
      { text: global.$lang.eng, value: "eng" },
      { text: global.$lang.math, value: "math" },
      { text: global.$lang.society, value: "society" },
      { text: global.$lang.science, value: "science" },
      { text: global.$lang.total, value: "total" },
      { text: global.$lang.average, value: "average" },
    ],
    selected: [],
    items: [],
  }),
  created() {},
  watch: {
    event(eid) {
      if (eid === "refresh") {
        this.initial();
      } else if (eid === "reload") {
        this.initial();
      }
    },
    data(value) {},
  },
  methods: {
    initial() {
      if (!this.data || !this.data.items) return;

      this.items = _.cloneDeep(this.data.items);
      // this.items = this.items.map((item) => {
      //   item["Key"] = `${item["Node ID"]}`;
      //   item["disabled"] = false;
      //   return item;
      // });
    },
    remove(item) {
      this.$emit("remove", item);
    },
  },
};
</script>

<style lang="scss">
</style>
