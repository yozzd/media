<template>
  <div>
    <Slug5 />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import Slug5 from '../../../../../../components/slug5/index.vue';

@Component({
  components: { Slug5 },
})
class Slug5Page extends Vue {}

export default Slug5Page;
</script>
