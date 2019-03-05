<template>
  <div>
    <Row type="flex" class="content">
      <Card title="List" icon="ios-options" :padding="0" shadow>
        <Scroll height="400">
          <CellGroup>
            <Cell
              v-for="(c, idx) in tData"
              :key="idx"
              :title="truncate(c.name, 40)"
              :to="`${path}/${c.name.split(c.extension)[0]}`"
              :selected="$route.path === `${path}/${c.name.split(c.extension)[0]}`"
            >
            <img v-lazy="thumb(c.path)" slot="extra" />
            </Cell>
            <no-ssr>
              <infinite-loading
                v-if="tData.length < data.length"
                @infinite="infiniteHandler"
              ></infinite-loading>
            </no-ssr>
          </CellGroup>
        </Scroll>
      </Card>
    </Row>
    <Row type="flex" class="info">
      <Alert>Showing {{ tData.length }} results from total {{ data.length }}</Alert>
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
  tData = [];

  async mounted() {
    const arr1 = Object.values(this.data);
    const idx1 = await Promise.resolve(arr1.findIndex(v => this.$route.path === `${this.path}/${v.name.split(v.extension)[0]}`));
    this.tData.push(...this.data.slice(0, (Math.floor(idx1 / 9) + 1.5) * 10));

    const arr2 = Object.values(this.tData);
    const idx2 = await Promise.resolve(arr2.findIndex(v => this.$route.path === `${this.path}/${v.name.split(v.extension)[0]}`));
    const el = this.$el.querySelector('.ivu-scroll-container');
    el.scrollTop = 84 * idx2;
    return true;
  }

  truncate = (s, v) => {
    const t = s.length >= v ? `${s.substring(0, v)} ...` : s;
    return t;
  }

  infiniteHandler($state) {
    const last = this.tData.length;
    if (last === (this.data.length - 1)) {
      $state.complete();
    } else {
      setTimeout(() => {
        this.tData.push(...this.data.slice(last + 1, last + 11));
        $state.loaded();
      }, 1000);
    }
  }

  thumb = (path) => {
    const p = path.split('static')[1];
    const t = p.replace('media', 'thumbnails');
    return `${t}.png`;
  }
}

export default RouteJump;
</script>

<style scoped>
.ivu-card {
  width: 100%;
}
/deep/ .ivu-cell {
  white-space: normal;
}
/deep/ .ivu-cell-item {
  display: flex;
  flex-direction: row;
  height: 70px;
}
/deep/ .ivu-cell-main {
  display: flex;
  order: 2;
  width: 100%;
}
/deep/ .ivu-cell-footer {
  display: flex;
  order: 1;
  position: unset;
  transform: unset;
  top: unset;
  margin-right: 8px;
  width: 234px;
  background-color: #000;
  justify-content: center;
}
/deep/ .ivu-cell-with-link .ivu-cell-footer {
  right: unset;
}
.info {
  margin-top: 20px;
}
</style>
