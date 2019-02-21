<template>
  <div>
    <Row type="flex" justify="space-between" class="toolbar">
      <Col :span="14">
      <Input
        v-if="showFilter"
        v-model="filter"
        :placeholder="`Filter By ${cap(select)}`"
        class="filter"
        @on-enter="handleFilter"
      >
      <Select slot="prepend" v-model="select" placeholder="Select">
        <Option
          v-for="item in filterOptions.select.options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        >
        </Option>
      </Select>
      <Button
        slot="append"
        custom-icon="iconfont icon-search"
        @click="handleFilter"
      ></Button>
      </Input>
      </Col>
      <Col :span="6">
      <slot name="action" />
      </Col>
    </Row>

    <Table
      ref="table"
      :columns="columns"
      :data="tableData"
      :loading="loading"
      size="small"
      @on-filter-change="handleFilterChange"
      @on-selection-change="selection => onSelectionChange(selection)"
    >
    </Table>

    <Row v-if="showPagination" class="pagination" type="flex" justify="end">
      <Page
        :current="pagination.pageIndex"
        :total="total"
        :page-size="pagination.pageSize"
        :page-size-opts="pageSizes"
        show-total
        show-elevator
        show-sizer
        @on-change="handleCurrentChange"
        @on-page-size-change="handleSizeChange"
      >
      </Page>
    </Row>
  </div>
</template>

<script>
import {
  Vue, Component, Watch, Emit,
} from 'vue-property-decorator';
import _ from 'lodash';

@Component({
  props: {
    data: {
      type: Array,
      required: true,
    },
    filterOptions: {
      type: Object,
    },
    columns: {
      type: Array,
      required: true,
    },
    showFilter: {
      type: Boolean,
      default: true,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    pageSizes: {
      type: Array,
      default: () => ([10, 50, 100]),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
class DataTable extends Vue {
  filter = '';

  select = this.filterOptions.select.options[0].value;

  pagination = {
    pageIndex: 1,
    pageSize: (() => {
      const { pageSizes } = this;
      if (pageSizes.length > 0) {
        return pageSizes[0];
      }
      return 20;
    })(),
  };

  columnFilter = {
    // eslint-disable-next-line no-underscore-dangle
    _filterChecked: [],
  };

  tableData = [];

  cacheLocalData = [];

  total = 0;

  mounted() {
    const { data } = this;
    this.loadLocalData(data);
  }

  @Watch('data')
  onDataChange(value) {
    this.loadLocalData(value);
  }

  @Emit()
  // eslint-disable-next-line class-methods-use-this
  onSelectionChange(value) {
    return value;
  }

  cap(val) {
    const option = _.reduce(
      this.filterOptions.select.options,
      (r, v) => {
        r[v.value] = v.label;
        return r;
      },
      {},
    );
    return option[val];
  }

  loadLocalData(data) {
    if (!data) {
      throw new Error(
        'You must set attribute \'data\' and \'data\' must be a array.',
      );
    }
    const cacheData = JSON.parse(JSON.stringify(data));
    this.cacheLocalData = cacheData;
    if (!this.showPagination) {
      this.pagination.pageSize = cacheData.length;
    }
    this.tableData = this.dataFilter(cacheData);
    this.total = cacheData.length;
  }

  dataFilter(data) {
    const { pageIndex, pageSize } = this.pagination;
    return data.filter((v, i) => i >= (pageIndex - 1) * pageSize && i < pageIndex * pageSize);
  }

  handleSizeChange(size) {
    this.pagination.pageSize = size;
    this.dataFilterHandler();
  }

  handleCurrentChange(pageIndex) {
    this.pagination.pageIndex = pageIndex;
    this.dataFilterHandler();
  }

  handleFilter(resetPageIndex = true) {
    if (resetPageIndex) {
      this.pagination.pageIndex = 1;
    }
    this.dataFilterHandler();
  }

  dataFilterHandler() {
    const { cacheLocalData } = this;
    if (this.filter) {
      const filterData = cacheLocalData.filter((o) => {
        const arrData = [];
        arrData.push(
          o[this.select].toLowerCase().indexOf(this.filter.toLowerCase()) !== -1,
        );
        return arrData.every(k => k);
      });
      this.tableData = this.dataFilter(filterData);
      this.total = filterData.length;
    } else {
      this.handleFilterChange(this.columnFilter);
    }
  }

  async handleFilterChange(column) {
    this.columnFilter = column;
    const { cacheLocalData } = this;
    // eslint-disable-next-line no-underscore-dangle
    if (column._filterChecked.length) {
      const reduceData = await Promise.all(
        _.reduce(
          column.filters,
          (r, v) => {
            r.push(v.value);
            return r;
          },
          [],
        ),
      );
      const pullAllData = await Promise.all(
        // eslint-disable-next-line no-underscore-dangle
        _.pullAll(reduceData, column._filterChecked),
      );
      const reduceDataAgain = await Promise.all(
        _.reduce(
          pullAllData,
          (r, v) => {
            const obj = {
              role: v,
            };
            r.push(obj);
            return r;
          },
          [],
        ),
      );
      const pullData = await Promise.all(
        _.differenceBy(cacheLocalData, reduceDataAgain, 'role'),
      );
      this.tableData = this.dataFilter(pullData);
      this.total = pullData.length;
    } else {
      this.tableData = this.dataFilter(cacheLocalData);
      this.total = cacheLocalData.length;
    }
  }
}

export default DataTable;
</script>

<style scoped>
.toolbar {
  margin: 20px 0;
}
.ivu-select {
  width: 130px;
}
.ivu-input-group {
  width: 450px;
}
/deep/ .ivu-input-group-prepend {
  text-align: left;
}
.pagination.ivu-row-flex.ivu-row-flex-end {
  margin-top: 10px;
}
</style>