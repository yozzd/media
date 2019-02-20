<template>
  <div>
    <Home />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import Home from '../components/home/index.vue';

@Component({
  components: { Home },
})
class HomePage extends Vue {}

export default HomePage;
</script>
