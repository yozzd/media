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
          dir: _.slice(this.$route.path, 1).join(''),
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
    return [
      { label: 'Home', to: '/' },
      { label: this.$route.params.slug1 },
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

export default Slug1;
</script>
