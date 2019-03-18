import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, {
  props: { distance: 0, spinner: 'waveDots' },
  slots: { noMore: 'No more data', noResults: 'No results' },
});
