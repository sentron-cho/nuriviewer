<template>
  <div>
    <template v-for="(item, index) in items">
      <v-lazy
        :key="`a-${index}`"
        :options="{ threshold: 0.25 }"
        :min-height="50"
      >
        <v-treeview
          return-object
          dense
          hoverable
          :expand-icon="icon.expend"
          item-disabled="selected"
          color="dark"
          open-on-click
          transition
          :active-class="activeclass"
          :items="[item]"
        >
          <template #label="{ item, open, active }">
            <v-row align="center">
              <v-col
                cols="6"
                :class="`text-truncate ${
                  item.title === '(empty)' && 'grey--text text--darken-1'
                }`"
                @click="select(item, active)"
              >
                <v-icon
                  v-if="item.isDataNode === 'false'"
                  :color="open ? 'primary' : 'dark'"
                >
                  {{ open ? icon.open_fold : icon.close_fold }}
                </v-icon>
                <v-icon v-else>
                  {{ icon.doc }}
                </v-icon>
                {{ item.title }}
              </v-col>
              <v-spacer />
            </v-row>
          </template>
        </v-treeview>
      </v-lazy>
    </template>
  </div>
</template>

<script>
export default {
  name: "TreePage",

  components: {},
  props: {
    items: { type: Array, default: null },
  },
  data: () => ({
    icon: global.$icon,
  }),
  watch: {
  },
  computed: {
  },
  methods: {
    select(item) {
      this.$emit("select", item);
    },
  },
};
</script>

<style lang="scss">
.v-treeview--dense .v-treeview-node__root {
  &.active {
    background: #c1ccff;
  }
}
</style>
