<template>
  <div>
    <bread-crumb :data="breadcrumb()" />
    <video-player v-if="getTree" :data="getFile" />
  </div>
</template>

<script>
import _ from 'lodash';
import { Vue, Component } from 'vue-property-decorator';
import BreadCrumb from '../breadcrumb/index.vue';
import VideoPlayer from '../videoplayer/index.vue';
import { GET_TREE } from '../../apollo/queries/media';

@Component({
  components: {
    BreadCrumb,
    VideoPlayer,
  },
  apollo: {
    getTree: {
      query: GET_TREE,
      variables() {
        return {
          dir: `static/media${this.$route.path}`,
        };
      },
    },
  },
})
class Slug4 extends Vue {
  getTree = null;

  breadcrumb() {
    const {
      slug1,
      slug2,
      slug3,
      slug4,
    } = this.$route.params;
    return [
      { label: 'Home', to: '/' },
      { label: slug1, to: `/${slug1}` },
      { label: slug2, to: `/${slug1}/${slug2}` },
      { label: slug3, to: `/${slug1}/${slug2}/${slug3}` },
      { label: slug4 },
    ];
  }

  get getFile() {
    return _.split(this.getTree.path, 'static', 2)[1];
  }
}

export default Slug4;
</script>
