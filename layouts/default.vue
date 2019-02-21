<template>
  <div>
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <nuxt />
      </Content>
      <Footer>
        <Foot />
      </Footer>
    </Layout>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import Navbar from '../components/navbar/index.vue';
import Foot from '../components/footer/index.vue';

@Component({
  components: { Navbar, Foot },
})
class DefaultLayout extends Vue {}

export default DefaultLayout;
</script>
