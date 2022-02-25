<template>
  <v-container fluid>
    <v-row class="u-data-box u-model">
      <v-col cols="12">
        <TablePage :items="data" @select="select" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TablePage from "@/page/TablePage";

export default {
  name: "DataView",

  components: {
    TablePage,
  },
  props: {
    event: { type: String, default: "none" },
  },
  data: () => ({
    buttons: [global.$icon.open_fold],
    item: [],
    data: [],
    rawdata: null,
  }),
  computed: {},
  watch: {
    event(eid) {
      if (eid === "reload") {
        this.rawdata = global.$store.getModel();
        console.dir(this.rawdata);
      } else if (eid === "clear") {
        const data = global.$store.getModel();
        if (!data) {
          this.data = [];
          this.rawdata = null;
          this.item = [];
        }
      } else if (eid === "refresh") {
        console.dir("refresh");
      }
    },
    // 모델 데이터가 변할 경우 트리를 생성한다.
    items(value) {},
  },
  methods: {},
};
</script>

<style lang="scss"></style>
