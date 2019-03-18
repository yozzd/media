<template>
  <div>
    <Spin v-if="$apollo.loading" size="large" fix></Spin>
    <div v-else>
      <bread-crumb :data="breadcrumb" />
      <plyr v-if="getTree[0].type === 'file'" :data="getTree[0]" />
      <data-table
        v-else
        :data="getTree[0].children"
        :filter-options="filterOptions"
        :columns="columns"
      >
      </data-table>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { Vue, Component } from 'vue-property-decorator';
import BreadCrumb from '../breadcrumb/index.vue';
import Plyr from '../plyr/index.vue';
import DataTable from '../datatable/index.vue';
import { GET_TREE } from '../../apollo/queries/media';

@Component({
  components: {
    BreadCrumb,
    Plyr,
    DataTable,
  },
  apollo: {
    getTree: {
      query: GET_TREE,
      variables() {
        return { id: this.$route.params.slug1, sig: 0 };
      },
    },
  },
})
class Slug1 extends Vue {
  getTree = [];

  get breadcrumb() {
    const r = [{ label: 'Home', to: '/' }];
    r.push(...this.getTree[0].breadcrumb);

    return r;
  }

  filterOptions = {
    select: {
      options: [{ value: 'name', label: 'Name' }],
    },
  };

  columns = [
    {
      title: '#',
      width: 60,
      align: 'center',
      type: 'index',
    },
    {
      title: 'Name',
      width: 600,
      key: 'name',
      sortable: true,
      render: (h, params) => h('div', [
        h('i', {
          class: {
            'ivu-icon': true,
            iconfont: true,
            fw: true,
            'icon-folder': params.row.type === 'dir' && params.row.mimeType === '',
            'icon-video': params.row.type === 'file' && params.row.mimeType.split('/')[0] === 'video',
            'icon-image': params.row.type === 'file' && params.row.mimeType.split('/')[0] !== 'video',
          },
        }),
        h(
          'nuxt-link',
          {
            props: {
              to: params.row.id,
            },
          },
          params.row.name,
        ),
      ]),
    },
    {
      title: 'Last Changed',
      minWidth: 100,
      render: (h, params) => (h('div', (moment(new Date(params.row.birthtime)).format('DD-MM-YYYY hh:mm')))),
    },
  ]
}

export default Slug1;
</script>
