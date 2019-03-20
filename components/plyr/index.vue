<template>
  <div>
    <Row type="flex" justify="space-between" :gutter="20" class="player">
      <Col :md="16" :lg="17" :xxl="19">
      <vue-plyr
        v-if="data.mimeType.split('/')[0] === 'video'"
        :options="options"
      >
        <video :src="data.base" :style="style"></video>
      </vue-plyr>
      <div v-else class="img-container" :style="style">
        <img v-lazy="data.base" />
      </div>
      </Col>
      <Col :md="8" :lg="7" :xxl="5">
      <Spin v-if="$apollo.loading" size="large" fix></Spin>
      <route-jump v-else :data="getTree" />
      </Col>
    </Row>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import RouteJump from '../routejump/index.vue';
import { GET_TREE } from '../../apollo/queries/media';

@Component({
  components: {
    RouteJump,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  apollo: {
    getTree: {
      query: GET_TREE,
      variables() {
        return { id: this.$route.params.slug1, sig: 1 };
      },
    },
  },
})
class Plyr extends Vue {
  style = {
    height: '',
  };

  options = {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'volume',
      'settings',
      'download',
      'fullscreen',
    ],
    tooltips: { controls: true },
    resetOnEnd: true,
    invertTime: false,
  };

  mounted() {
    const e = this.$el.querySelector('.plyr video');
    const el = !e ? this.$el.querySelector('.img-container') : e;
    this.style = {
      height: `${(el.clientWidth / 2) + 50}px`,
    };
  }
}

export default Plyr;
</script>

<style scoped>
.player {
  margin-top: 20px;
}
.img-container {
  display: flex;
  justify-content: center;
  background-color: #000;
}
.img-container > img {
  width: auto;
  height: 100%;
}
</style>
