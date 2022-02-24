<template>
  <v-app-bar app color="" dark>
    <div class="d-flex align-center">
      <!-- <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="/logo.png"
        transition="slide-y-transition"
      /> -->
      <v-subheader class="v-logo">{{ "File Viewer" }}</v-subheader>
    </div>

    <v-spacer></v-spacer>
    <div>
      <v-subheader>{{ `Project Folder : ${root} ` }}</v-subheader>
    </div>

    <v-spacer></v-spacer>

    <div>
      <v-btn text @click="(event) => load(event)">
        <v-icon>{{ icon.load }}</v-icon>
      </v-btn>
      <v-btn text @click="(event) => save(event)">
        <v-icon>{{ icon.save }}</v-icon>
      </v-btn>
      <v-btn text @click="(event) => clear(event)">
        <v-icon>{{ icon.refresh }}</v-icon>
      </v-btn>
      <v-btn text>
        <v-icon>{{ icon.logout }}</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeadBar",
  props: {},
  data: () => ({
    icon: global.$icon,
    root: global.$file.DATA_ROOT,
  }),
  created() {},
  methods: {
    clear() {
      global.$store.clear();
      this.$store.commit("clear");
    },
    save() {
      // 저장폴더는 일단 임시로...
      // 프로젝트 데이터를 파일로 저장.
      const path = global.$file.saveFile(this.root, global.$store.toData());
      this.$store.commit("alertInfo", `${path} ${global.$lang.alert.save_ok}`);
    },
    load() {
      // 파일로 저장된 프로젝트 데이터를 불러오자.
      const data = global.$file.loadFile(this.root);
      global.$store.fromData(data);

      this.$store.commit("reload");
      // console.dir(global.$store.toData());
    },
  },
};
</script>

<style lang="scss"></style>
