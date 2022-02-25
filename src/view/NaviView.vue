<template>
  <v-container fluid>
    <v-row class="u-data-box u-equip">
      <v-col cols="12">
        <ListPage :event="event" :data="data" @select="select" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListPage from "@/page/ListPage";

export default {
  name: "NaviView",
  components: {
    ListPage,
  },
  props: {
    event: { type: String, default: "none" },
  },
  data: () => ({
    items: [],
    tabs: [],
    selection: "",
    data: {},
    buttons: [global.$icon.open_fold],
  }),
  created() {},
  computed: {},
  watch: {
    event(eid) {
      if (eid === "reload") {
        this.initial();
      } else if (eid === "clear") {
        const data = global.$store.getModel();
        if (!data) {
          this.data = [];
          this.rawdata = null;
          this.item = [];
        }
      } else if (eid === "refresh") {
        // console.dir("refresh");
      }
    },
  },
  methods: {
    initial() {
      this.rawdata = global.$store.getModel();
      const list = this.rawdata.map((a) => {
        return { name: a.name };
      });
      this.data = { items: list };
    },
    select(value) {
      const { name } = value;
      global.$store.setSelection(name);
      this.$store.commit("refreshAll");
    },
  },
};
</script>

<style lang="scss">
</style>

