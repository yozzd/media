<template>
  <div>
    <data-table
      :data="getTree.children"
      :filter-options="filterOptions"
      :columns="columns"
      :loading="$apollo.loading"
    >
    </data-table>
  </div>
</template>

<script>
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
        dir: 'media',
      },
    },
  },
})
class Home extends Vue {
  getTree = {
    children: [],
  };

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
      width: 300,
      sortable: true,
      render: (h, params) => h('div', [
        h(
          'nuxt-link',
          {
            props: {
              to: params.row.name,
            },
          },
          params.row.name,
        ),
      ]),
    },
    {
      title: 'Size (MB)',
      minWidth: 100,
      render: (h, params) => (h('div', [h('span', params.row.size / 1000000)])),
    },
  ];
}

export default Home;
</script>
