<template>
  <div>
    <nuxt-link
      v-for="(item, key) in getTree.children"
      :key="key"
      :to="item.path"
    >
      {{ item.name }}
    </nuxt-link>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { GET_TREE1 } from '../../apollo/queries/media';

@Component({
  apollo: {
    getTree: {
      query: GET_TREE1,
      variables: {
        dir: 'media',
      },
    },
  },
})
class Home extends Vue {
  getTree = null;
}

export default Home;
</script>
