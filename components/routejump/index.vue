<template>
  <div>
    <Row type="flex" class="content">
      <Card title="List" icon="ios-options" :padding="0" shadow>
        <Scroll height="500">
          <CellGroup>
            <no-ssr>
              <infinite-loading
                direction="top"
                @infinite="infiniteHandlerTop"
              ></infinite-loading>
            </no-ssr>
            <Cell
              v-for="(c, idx) in tData"
              :key="idx"
              :title="truncate(c.name, 40)"
              :to="c.id"
              :selected="$route.params.slug1 === c.id"
            >
              <img slot="extra" :key="c.id" v-lazy="c.thumbnail" />
            </Cell>
            <no-ssr>
              <infinite-loading
                @infinite="infiniteHandlerBottom"
              ></infinite-loading>
            </no-ssr>
          </CellGroup>
        </Scroll>
      </Card>
    </Row>
    <Row type="flex" class="info">
      <Alert>Showing {{ tData.length }} results from total {{ getTotal.total }}</Alert>
    </Row>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { GET_TREE, GET_TOTAL } from '../../apollo/queries/media';

@Component({
  props: {
    data: {
      type: Array,
    },
  },
  apollo: {
    getTotal: {
      query: GET_TOTAL,
      variables() {
        return { id: this.$route.params.slug1 };
      },
    },
  },
})
class RouteJump extends Vue {
  tData = [];

  getTotal = {
    total: 0,
  }

  async mounted() {
    const { slug1 } = this.$route.params;
    const arr1 = Object.values(this.data);
    const idx1 = await Promise.resolve(arr1.findIndex(v => slug1 === v.id));
    this.tData.push(...this.data.slice(0, (Math.floor(idx1 / 9) + 1.5) * 10));

    const arr2 = Object.values(this.tData);
    const idx2 = await Promise.resolve(arr2.findIndex(v => slug1 === v.id));
    const el = this.$el.querySelector('.ivu-scroll-container');
    el.scrollTop = 85 * idx2;
    return true;
  }

  truncate = (s, v) => {
    const t = s.length >= v ? `${s.substring(0, v)} ...` : s;
    return t;
  }

  async infiniteHandlerTop($state) {
    const client = this.$apollo.getClient();
    const { data } = await client.query({
      query: GET_TREE,
      variables: {
        id: this.tData[0].id,
        sig: 1,
        infinite: true,
        direction: 0,
      },
    });
    if (data.getTree.length) {
      this.tData.unshift(...data.getTree);
      $state.loaded();
    } else {
      $state.complete();
    }
  }

  async infiniteHandlerBottom($state) {
    const client = this.$apollo.getClient();
    const { data } = await client.query({
      query: GET_TREE,
      variables: {
        id: this.tData[this.tData.length - 1].id,
        sig: 1,
        infinite: true,
        direction: 1,
      },
    });
    if (data.getTree.length) {
      this.tData.push(...data.getTree);
      $state.loaded();
    } else {
      $state.complete();
    }
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
  border-bottom: 1px dashed #ddd;
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
  border-radius: 2px;
}
/deep/ .ivu-cell-with-link .ivu-cell-footer {
  right: unset;
}
/deep/ .ivu-cell-arrow {
  display: none;
}
.info {
  margin-top: 20px;
}
</style>
