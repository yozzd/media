<template>
  <div>
    {{ getTree }}
  </div>
</template>

<script>
import _ from 'lodash';
import { Vue, Component } from 'vue-property-decorator';
import { GET_TREE } from '../../apollo/queries/media';

@Component({
  apollo: {
    getTree: {
      query: GET_TREE,
      variables() {
        return {
          dir: _.slice(this.$route.path, 1).join(''),
        };
      },
      fetchPolicy: 'no-cache',
    },
  },
})
class Slug1 extends Vue {
  getTree = null;
}

export default Slug1;
</script>
