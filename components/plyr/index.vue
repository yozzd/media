<template>
  <div>
    <Row type="flex" justify="space-between" :gutter="20" class="player">
      <Col :md="16" :lg="17" :xxl="20">
      <vue-plyr v-if="data.extension === '.mp4'" :options="options">
        <video :src="getFile"></video>
      </vue-plyr>
      <div v-else class="img-container">
        <img v-lazy="getFile" />
      </div>
      </Col>
      <Col :md="8" :lg="7" :xxl="4">
      <route-jump :data="getChildren" :path="path" />
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
        const arr = Object.values(this.$route.params);
        const path = arr.reduce((r, v, k) => {
          if ((k + 1) < arr.length) {
            r += `/${v}`;
          }
          r += '';
          return r;
        }, '');

        this.path = path;
        return {
          path,
        };
      },
    },
  },
})
class Plyr extends Vue {
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

  get getFile() {
    return this.data.path.split('static')[1];
  }

  get getChildren() {
    const arr = Object.values(this.getTree.children);
    const filter = arr.filter(v => v.type !== 'directory');
    return filter;
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
  width: 100%;
  height: 100%;
}
</style>
