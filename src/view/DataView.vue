<template>
  <v-container fluid>
    <v-row class="u-data-box u-model">
      <v-col cols="12">
        <TablePage :event="event" :data="data" @select="select" />
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
        this.initial();
      } else if (eid === "clear") {
        const data = global.$store.getModel();
        if (!data) {
          this.data = [];
          this.rawdata = null;
          this.item = [];
        }
      } else if (eid === "refresh") {
        this.initial();
      }
    },
    // 모델 데이터가 변할 경우 트리를 생성한다.
    items(value) {},
  },
  methods: {
    initial() {
      this.rawdata = global.$store.getModel();
      const select = global.$store.getSelection();

      const list = this.rawdata.filter((a) => a.name === select);
      const objs = list && { ...list[0] };
      if (objs.items) {
        objs.items = objs.items.map((item) => {
          const KEYS = [
            "no",
            "name",
            "age",
            "kor",
            "eng",
            "math",
            "society",
            "science",
            "total",
            "average",
          ];
          const jsons = {};

          const temps = item.split("#");
          temps.forEach((a, index) => {
            if (index <= 0) return;
            jsons[KEYS[index - 1]] = a;
          });

          return jsons;
        });

        // objs.items = jsons;
      }

      this.data = objs;
      console.dir(this.data);
    },
    select(value) {
      const { name } = value;
      global.$store.setSelection(name);
      console.dir(value);
      this.$store.commit("refreshAll");
    },
  },
};
</script>

<style lang="scss"></style>
