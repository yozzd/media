<template>
  <div>
    <Row type="flex" class="routejump">
      <Card title="List" icon="ios-options" :padding="0" shadow>
        <Scroll ref="scroll">
          <CellGroup>
            <Cell
              v-for="(c, idx) in data"
              :key="idx"
              :title="c.name"
              :to="`${path}/${c.name.split(c.extension)[0]}`"
              :selected="$route.path === `${path}/${c.name.split(c.extension)[0]}`"
            />
          </CellGroup>
        </Scroll>
      </Card>
    </Row>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  props: {
    data: {
      type: Array,
    },
    path: {
      type: String,
    },
  },
})
class RouteJump extends Vue {
  async mounted() {
    const arr = Object.values(this.data);
    const index = await Promise.resolve(arr.findIndex(v => this.$route.path === `${this.path}/${v.name.split(v.extension)[0]}`));
    const el = this.$el.querySelector('.ivu-scroll-container');
    const m = el.offsetHeight / (el.scrollHeight / arr.length);
    el.scrollTop = m * index * 5;
    return true;
  }
}

export default RouteJump;
</script>

<style scoped>
.ivu-card {
  width: 100%;
}
.ivu-cell {
  white-space: normal;
}
</style>
