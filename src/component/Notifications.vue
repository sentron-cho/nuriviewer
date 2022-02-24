<template>
  <v-snackbar
    v-model="showMessage"
    class="v-noti"
    :multi-line="true"
    :timeout="2000"
    :color="notify.color"
    absolute
    centered
  >
    <span class="font-weight-black">{{ notify.message }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="showMessage = false">
        X
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
// import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Notifications",
  components: {},
  props: {},
  data: () => ({
    showMessage: false,
  }),
  computed: {
    notify() {
      // console.dir(this.$store.state.notify);
      return this.$store.state.notify;
    },
  },
  watch: {
    "$store.state.notify"() {
      this.showMessage = false;
      this.$nextTick(() => {
        this.showMessage = true;
      });
    },
  },
};
</script>

<style scoped></style>
