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
      minWidth: 180,
      sortable: true,
      render: (h, params) => h('div', [
        h(
          'nuxt-link',
          {
            props: {
              to: params.row.path,
            },
          },
          params.row.name,
        ),
      ]),
    },
  ];
}

export default Home;
</script>
