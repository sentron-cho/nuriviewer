<template>
  <v-container fluid>
    <v-row class="u-data-box u-equip">
      <v-col cols="12">
        <ListPage :items="data" @select="select" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListPage from "@/page/ListPage";

export default {
  name: "NaviView",
  components: {
    ListPage
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
      console.dir(eid);
    },
  },
  methods: {},
};
</script>

<style lang="scss">
</style>

