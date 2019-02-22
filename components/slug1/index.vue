<template>
  <div>
    <bread-crumb :data="breadcrumb()" />
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
import _ from 'lodash';
import { Vue, Component } from 'vue-property-decorator';
import BreadCrumb from '../breadcrumb/index.vue';
import DataTable from '../datatable/index.vue';
import { GET_TREE } from '../../apollo/queries/media';

@Component({
  components: {
    BreadCrumb,
    DataTable,
  },
  apollo: {
    getTree: {
      query: GET_TREE,
      variables() {
        return {
          dir: `static/media${this.$route.path}`,
        };
      },
    },
  },
})
class Slug1 extends Vue {
  getTree = {
    children: [],
  };

  breadcrumb() {
    const { slug1 } = this.$route.params;
    return [
      { label: 'Home', to: '/' },
      { label: slug1 },
    ];
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
      sortable: true,
      render: (h, params) => h('div', [
        h(
          'nuxt-link',
          {
            props: {
              to: _.drop(_.split(params.row.path, '/', 4), 2).join('/'),
            },
          },
          params.row.name,
        ),
      ]),
    },
    {
      title: 'Size (MB)',
      minWidth: 100,
      render: (h, params) => (h('div', (params.row.size / 1000000).toFixed(2))),
    },
  ];
}

export default Slug1;
</script>
