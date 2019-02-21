<template>
  <div>
    <Menu mode="horizontal">
      <div class="navbar-logo">
        Media
      </div>
    </Menu>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
class Navbar extends Vue {}

export default Navbar;
</script>

<style scoped>
.navbar-logo {
  font-size: 18px;
  font-weight: bold;
  float: left;
}
</style>
