<template>
  <div>
    <Row type="flex" justify="center" class="player">
      <vue-plyr :options="options">
        <video :src="data"></video>
      </vue-plyr>
    </Row>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  props: {
    data: {
      type: String,
    },
  },
})
class VideoPlayer extends Vue {
  options = {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'volume',
      'settings',
      'download',
      'fullscreen',
    ],
    tooltips: { controls: true },
    resetOnEnd: true,
    invertTime: false,
  };
}

export default VideoPlayer;
</script>

<style scoped>
.player {
  margin-top: 20px;
}
</style>
