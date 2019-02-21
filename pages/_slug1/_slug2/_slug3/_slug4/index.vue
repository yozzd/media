<template>
  <div>
    <Slug4 />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import Slug4 from '../../../../../components/slug4/index.vue';

@Component({
  components: { Slug4 },
})
class Slug4Page extends Vue {}

export default Slug4Page;
</script>
