<template>
  <div>
    <bread-crumb :data="breadcrumb()" />
    <Spin v-if="$apollo.loading" size="large" fix></Spin>
    <data-table
      v-if="getTree.children"
      :data="getTree.children"
      :filter-options="filterOptions"
      :columns="columns"
    >
    </data-table>
    <plyr v-else :data="getTree" />
  </div>
</template>

<script>
import _ from 'lodash';
import { Vue, Component } from 'vue-property-decorator';
import BreadCrumb from '../breadcrumb/index.vue';
import DataTable from '../datatable/index.vue';
import Plyr from '../plyr/index.vue';
import { GET_TREE } from '../../apollo/queries/media';

@Component({
  components: {
    BreadCrumb,
    DataTable,
    Plyr,
  },
  apollo: {
    getTree: {
      query: GET_TREE,
      variables() {
        const path = Object.values(this.$route.params).reduce((r, v) => {
          r += `/${v}`;
          return r;
        }, '');
        return {
          path,
        };
      },
    },
  },
})
class Slug4 extends Vue {
  getTree = {
    children: [],
  };

  breadcrumb() {
    const {
      slug1,
      slug2,
      slug3,
      slug4,
    } = this.$route.params;
    return [
      { label: 'Home', to: '/' },
      { label: slug1, to: `/${slug1}` },
      { label: slug2, to: `/${slug1}/${slug2}` },
      { label: slug3, to: `/${slug1}/${slug2}/${slug3}` },
      { label: slug4 },
    ];
  }

  filterOptions = {
    select: {
      options: [{ value: 'name', label: 'Name' }],
    },
  };

  get columns() {
    const {
      slug1,
      slug2,
      slug3,
      slug4,
    } = this.$route.params;
    return [
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
          h('i', {
            class: {
              'ivu-icon': true,
              iconfont: true,
              fw: true,
              'icon-folder': params.row.type === 'directory' && params.row.extension === null,
              'icon-video': params.row.type === 'file' && params.row.extension === '.mp4',
              'icon-image': params.row.type === 'file' && params.row.extension !== '.mp4',
            },
          }),
          h(
            'nuxt-link',
            {
              props: {
                to: params.row.type === 'directory' ? `/${slug1}/${slug2}/${slug3}/${slug4}/${params.row.name}` : `/${slug1}/${slug2}/${slug3}/${slug4}/${_.split(params.row.name, params.row.extension, 1)}`,
              },
            },
            params.row.name,
          ),
        ]),
      },
      {
        title: 'Size (MB)',
        minWidth: 100,
        render: (h, params) => h('div', (params.row.size / 1000000).toFixed(2)),
      },
    ];
  }
}

export default Slug4;
</script>
