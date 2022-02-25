<template>
  <v-container fluid>
    <v-data-table
      dense
      :headers="headers"
      :items="items"
      hide-default-footer
      disable-pagination
      class="elevation-1 u-table"
      item-key="Key"
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
      { text: "학과명", value: "classid", width: "100%" },
    ],
    selected: [],
    items: [],
  }),
  created() {},
  watch: {
    event(eid) {
      // if (eid === "refresh") {
      // } else if (eid === "reload") {
      // }
    },
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
