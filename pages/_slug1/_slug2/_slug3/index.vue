<template>
  <div>
    <Slug3 />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import Slug3 from '../../../../components/slug3/index.vue';

@Component({
  components: { Slug3 },
})
class Slug3Page extends Vue {}

export default Slug3Page;
</script>
