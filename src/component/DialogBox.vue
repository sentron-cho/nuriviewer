<template>
  <v-dialog
    class="v-dialog-box"
    v-if="dialog"
    v-model="dialog"
    :width="width"
    @click:outside="clickOutside"
  >
    <v-card>
      <div class="v-dlg-head">
        <v-card-title v-if="title">{{ title }}</v-card-title>
      </div>
      <div class="v-dlg-body">
        <v-card-text v-if="message">{{ message }}</v-card-text>
        <slot v-if="$slots.default"></slot>
      </div>
      <div class="v-dlg-foot">
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="primary" text @click="dialog = false"> I accept </v-btn> -->
          <v-btn color="primary" text @click="() => click(true)">Ok</v-btn>
          <v-btn color="primary" text @click="() => click(false)">Close</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // name: "DialogBox",

  components: {},
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: "" },
    message: { type: String, default: "" },
    event: { type: String, default: "none" },
    width: { type: String, default: "400" },
  },
  data: () => ({
    dialog: false,
  }),
  watch: {
    visible(value) {
      this.dialog = value;
    },
  },
  created() {
    // this.dialog = this.visible;
    // console.dir(this.dialog)
  },
  methods: {
    click(value) {
      this.$emit("click", value);
    },
    clickOutside() {
      this.click(false);
      // if (!this.persistent) {
      //   this.close();
      // }
    },
  },
};
</script>


<style lang="scss">
.v-dialog {
  .v-card {
    position: relative;
    min-height: 240px;

    .v-dlg-head {
      position: absolute;
      width: 100%;
      top: 0;
      height: 60px;
      background: #d5d7ff;
      .v-card__title {
        padding: 12px 14px;
      }
    }

    .v-dlg-body {
      position: relative;
      width: 100%;
      top: 60px;
      padding: 12px 20px;

      max-height: calc(100% - 100px);

      .v-card__text {
        padding: 0;
        margin: 0;
      }
    }

    .v-dlg-foot {
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 60px;
    }
  }
  .v-dialog-box {
    border: 1px solid rgb(200, 200, 200);
  }
}
</style>
