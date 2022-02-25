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
      @click:row="select"
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
        text: global.$lang.classname,
        value: "name",
        width: "100%",
        align: "center",
      },
    ],
    selected: [],
    items: [],
  }),
  created() {},
  watch: {
    event(eid) {
      if(eid === 'clear') {
        this.items = [];
        return;
      }

      this.initial();
      // if (eid === "refresh") {
      // } else if (eid === "reload") {
      // }
    },
  },
  methods: {
    initial() {
      if (!this.data || !this.data.items) return;
      this.items = _.cloneDeep(this.data.items);
    },
    select(v) {
      this.$emit("select", v);
    },
  },
};
</script>

<style lang="scss">
</style>
