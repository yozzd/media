<template>
  <div>
    <vue-plyr>
      <video :src="data"></video>
    </vue-plyr>
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
class VideoPlayer extends Vue {}

export default VideoPlayer;
</script>
