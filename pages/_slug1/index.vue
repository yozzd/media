<template>
  <div>
    <Slug1 />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import Slug1 from '../../components/slug1/index.vue';

@Component({
  components: { Slug1 },
})
class Slug1Page extends Vue {}

export default Slug1Page;
</script>
