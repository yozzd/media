<template>
  <div>
    <Row type="flex" justify="space-between" :gutter="20" class="player">
      <Col :span="18">
      <vue-plyr v-if="data.extension === '.mp4'" :options="options">
        <video :src="getFile"></video>
      </vue-plyr>
      <img v-else v-lazy="getFile" class="img-container" />
      </Col>
      <Col :span="6">
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
img.img-container {
  width: 100%;
}
</style>
