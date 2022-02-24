<template>
  <v-app>
    <HeadBar />
    <MainFrame />
    <Notifications />
  </v-app>
</template>

<script>
import HeadBar from "./view/HeadBar";
import MainFrame from "./view/MainFrame";
import Notifications from "./component/Notifications.vue";
import Store from "./store/Store";
import Lang from "./svc/Lang";
import Icon from "./svc/Icon";
import File from "./svc/FileManager";

export default {
  name: "App",

  components: {
    HeadBar,
    MainFrame,
    Notifications,
  },

  created() {
    global.$store = Store();
    global.$lang = Lang();
    global.$icon = Icon;
    global.$file = File;
  },
};
</script>
