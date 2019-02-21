<template>
  <div>
    <Slug2 />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import Slug2 from '../../../components/slug2/index.vue';

@Component({
  components: { Slug2 },
})
class Slug2Page extends Vue {}

export default Slug2Page;
</script>
