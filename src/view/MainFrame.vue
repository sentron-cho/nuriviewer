<template>
  <v-main>
    <v-container :class="`u-main-frame ${this.screen}`" fluid>
      <v-row class="u-top-layer">
        <v-col cols="3" class="u-col">
          <NaviView class="u-page-view" :event="event" />
        </v-col>
        <v-col cols="9" class="u-col">
          <DataView class="u-page-view" :event="event" @select="select" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import DataView from "./DataView";
import NaviView from "./NaviView";

export default {
  name: "MainFrame",

  components: {
    DataView,
    NaviView,
  },
  data: () => ({
    event: "none",
    screen: "normal",
    modelKey: null,
  }),
  watch: {
    "$store.state.refresh"() {
      // if (this.$store.state.refresh === "true") {
      this.event = "refresh";
      this.$nextTick(() => (this.event = "none"));
      // }
    },
    "$store.state.clear"() {
      if (this.$store.state.clear === "true") {
        this.event = "clear";
        this.$nextTick(() => (this.event = "none"));
      }
    },
    "$store.state.reload"() {
      if (this.$store.state.reload === "true") {
        this.event = "reload";
        this.$nextTick(() => (this.event = "none"));
      }
    },
  },
  methods: {
    select() {
      const addMapData = () => {
        const equip = global.$store.getSelectionEquipment();
        const model = global.$store.getSelectionModel();

        if (!equip) {
          console.warn("equipment 해제 ~~~~");
        } else if (!model) {
          console.warn("model 해제 ~~~~");
        } else {
          if (!model || !model.localId || !model.shortId) return;

          const mapdata = { ...equip };
          mapdata.localId = model.localId;
          mapdata.shortId = model.shortId;
          mapdata.nameObject = model.nameObject;

          // 글로벌 저장소의 현재 map 아이템에 대한 참조 변수로 가져온다.
          // 즉, clone하여 가져오는 것이 아님에 주의하자.
          const item = global.$store
            .getMapping()
            .find((item) => item.deviceId === equip.deviceId);

          // 매핑 데이터 리스트를 글로벌 저장소 데이터에 업데이트
          if (mapdata && item) {
            if (!item["componentDataSet"]) item["componentDataSet"] = [];

            // 중복된 값이 아니면 항목을 추가한다.
            const dup = item["componentDataSet"].find(
              (a) => a.Key === equip.Key
            );
            if (!dup) {
              item["componentDataSet"].push(mapdata);
              global.$store.resetEquipment();
              global.$store.resetModel();
            }
          }
          // else {
          //   item.dataSet["componentDataSet"] =
          //     item.dataSet.componentDataSet.filter(
          //       (a) => a.Address !== mapdata.Address
          //     );
          // }
        }
      };

      addMapData();

      this.$store.commit("refreshAll");
    },
    sizing() {
      if (this.screen === "normal") this.screen = "half";
      else if (this.screen === "half") this.screen = "full";
      else this.screen = "normal";
    },
    remove() {
      this.event = "refresh";
      this.$nextTick(() => (this.event = "none"));
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/main.scss";

.v-data-table {
  border: 1px solid rgb(200, 200, 200);
}

.u-table.theme--light table {
  thead tr th {
    background-color: #e6e6e6;
    border-color: #bdbdbd;
    min-width: 80px;
    border-right: rgb(200, 200, 200) 1px solid;
    text-align: center !important;
  }

  tbody tr {
    color: black;

    &.v-data-table__selected {
      background: #e4e4e4;
      color: rgb(163, 163, 163);

      &.active,
      &.active:hover {
        background: #c1ccff !important;
        color: rgb(0, 0, 0);
      }
    }

    td {
      border-right: rgb(200, 200, 200) 1px dotted;
    }
  }
}

.theme--light.v-treeview .v-treeview-node .v-treeview-node--disabled {
  background: #e4e4e4;
}

.v-snack {
  .v-sheet {
    white-space: pre-wrap;
  }
}

.v-subheader.v-logo {
  font-size: 30px;
  font-weight: 600;
  color: #ffffff;
}
</style>
