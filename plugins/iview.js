import Vue from 'vue';
import iView from 'iview';
import locale from 'iview/dist/locale/en-US';

export default () => {
  Vue.use(iView, {
    locale,
  });
};
