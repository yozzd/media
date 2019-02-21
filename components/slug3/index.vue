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
          dir: `media/${this.$route.params.slug1}/${this.$route.params.slug2}/${this.$route.params.slug3}`,
        };
      },
    },
  },
})
class Slug3 extends Vue {
  getTree = {
    children: [],
  };

  breadcrumb() {
    return [
      { label: 'Home', to: '/' },
      { label: this.$route.params.slug1, to: `/${this.$route.params.slug1}` },
      { label: this.$route.params.slug2, to: `/${this.$route.params.slug1}/${this.$route.params.slug2}` },
      { label: this.$route.params.slug3 },
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
      width: 300,
      sortable: true,
      render: (h, params) => h('div', [
        h(
          'nuxt-link',
          {
            props: {
              to: _.drop(_.split(params.row.path, '/', 5), 3).join('/'),
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

export default Slug3;
</script>
