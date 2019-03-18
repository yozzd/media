<template>
  <div>
    <Spin v-if="$apollo.loading" size="large" fix></Spin>
    <data-table
      v-else
      :data="getTree"
      :filter-options="filterOptions"
      :columns="columns"
    >
    </data-table>
  </div>
</template>

<script>
import moment from 'moment';
import { Vue, Component } from 'vue-property-decorator';
import DataTable from '../datatable/index.vue';
import { GET_TREE } from '../../apollo/queries/media';

@Component({
  components: {
    DataTable,
  },
  apollo: {
    getTree: {
      query: GET_TREE,
      variables: {
        id: '',
        sig: 0,
      },
    },
  },
})
class Home extends Vue {
  getTree = [];

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
      Width: 600,
      sortable: true,
      render: (h, params) => h('div', [
        h(
          'i',
          {
            class: {
              'ivu-icon': true,
              iconfont: true,
              fw: true,
              'icon-folder': true,
            },
          },
        ),
        h(
          'nuxt-link',
          {
            props: {
              to: `/${params.row.id}`,
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
  ];
}

export default Home;
</script>
