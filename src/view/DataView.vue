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
        this.data = this.makeTree(this.rawdata);
        const temps = global.$store.getMappingDataset(this.name);
        this.makeSelected(this.data, temps);
      } else if (eid === "clear") {
        const data = global.$store.getModel();
        if (!data) {
          this.data = [];
          this.rawdata = null;
          this.item = [];
        }
      } else if (eid === "refresh") {
        const temps = global.$store.getMappingDataset(this.name);
        this.makeSelected(this.data, temps);
      }
    },
    // 모델 데이터가 변할 경우 트리를 생성한다.
    items(value) {},
  },
  methods: {
    openfile() {
      const file = global.$file.openXmlFile();
      const object = global.$file.readXmlFile(file);
      if (!object || !object.elements) {
        this.$store.commit("alertWarn", global.$lang.alert.file_error_model);
        return;
      }

      this.rawdata = object;
      // console.dir(this.rawdata);

      global.$store.clearModel();
      // 글로벌 변수인 $store에 데이터 저장
      this.data = this.makeTree(this.rawdata);
      global.$store.setModel(this.rawdata);
    },
    click(index) {
      if (index < 0) return console.warn("인덱스 오류!!!!");

      if (index === 0) {
        this.openfile();
      }
    },
    select(value) {
      // 실제 선택된 노드를 글로벌 변수에도 넣어주자.
      if (!value) {
        global.$store.resetModel();
      } else {
        const { elements } = value;
        if (elements && elements.length > 0) {
          const { attributes } = elements[0];
          global.$store.selectModel(attributes);
        }
      }

      this.$emit("select", value);
    },
    makeSelected(objs, sellist = null) {
      if (!sellist) return;

      const children = (node) => {
        node.children.forEach((element) => {
          if (element.children && element.isDataNode !== "true") {
            children(element);
          } else {
            if (element.elements) {
              const { elements } = element;
              if (elements && elements[0]) {
                const { attributes } = elements[0];
                if (attributes) {
                  const index = sellist.findIndex(
                    (item) => item.localId === attributes.localId
                  );
                  if (index >= 0) element.selected = true;
                  else element.selected = false;
                }
              }
            }
          }
        });
      };

      objs.forEach((element) => {
        if (element.isDataNode !== "true") {
          // element.selected = true;
          children(element);
        }
      });
    },
    makeTree(objs) {
      const items = [];
      if (!objs || !objs.elements || objs.elements.length < 1) {
        console.warn("xml data is not data!");
        return items;
      }

      const arrays = objs.elements[0].elements;

      for (let index = 0; index < arrays.length; index++) {
        const item = arrays[index];
        if (item.name !== "dmd:RootNode") continue;

        const { attributes } = item;
        const node = {
          ...attributes,
          id: attributes.name
            ? `${attributes.name}-${this.uuid()}`
            : this.uuid(),
          title: attributes.name ? attributes.name : "(empty)",
          level: attributes.level,
          type: "node",
          selected: false,
        };

        node.children = this.getChildren(item);
        items.push(node);
      }

      return items;
    },
    getChildren(object) {
      const arr = [];
      const { elements } = object;

      elements &&
        elements.forEach((item) => {
          const { name, attributes } = item;

          if (attributes && name) {
            if (name === "dmd:DataObject") {
              // console.dir(attributes)
            } else if (name === "dmd:ChildNode") {
              const node = {
                ...attributes,
                id: attributes.name
                  ? `${attributes.name}-${this.uuid()}`
                  : this.uuid(),
                title: attributes.name ? attributes.name : "(empty)",
                level: attributes.level,
                selected: false, // 선택된 항목이면 disabled 처리하기 위한 속성값
              };

              if (item.elements) {
                node.children = this.getChildren(item);
              }

              node.object = item.attributes;

              if (attributes.isDataNode) {
                node.elements = item.elements;
              }

              if (typeof node.object === "object") {
                node.object["nameObject"] = item.attributes.name;
              }

              arr.push(node);
            }
          }
        });

      return arr;
    },
    uuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
  },
};
</script>

<style lang="scss"></style>
