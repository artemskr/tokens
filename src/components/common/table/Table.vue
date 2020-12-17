<template>
  <div class="tbl">
    <table class="styled-table">
      <TableHeader :headers="Object.keys(tableHeaders)"
                   :tableHeaders="tableHeaders"
                   :filterBy="filterBy"
                   @headerClicked="headerClicked"
                   @filterSelected="filterSelected"/>
      <tbody>
        <template v-if="tableData.length">
          <TableRow v-for="(item, index) in tableData"
              :rowData="item"
              :rowIndex="index"
              :dateTimeFields="dateTimeFields"
              :key="`tbl-r-${index}`"/>
        </template>
        <tr v-else>
          <td colspan="9">No matching data</td>
        </tr>
      </tbody>
    </table>
    <div class="paginator-container">
      <paginate
          v-if="showPaginator"
          v-model="page"
          :page-count="Math.ceil(totalRows/perPage)"
          :page-range="3"
          :margin-pages="2"
          :click-handler="pageSelected"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          >
      </paginate>
    </div>
  </div>
</template>

<script>
import TableHeader from '@/components/common/table/TableHeader.vue'
import TableRow from '@/components/common/table/TableRow.vue'

export default {
  name: 'Table',
  props: {
    tableData: Array,
    filterBy: Object,
    dateTimeFields: Array,
    tableHeaders: Object,
    perPage: Number,
    totalRows: Number
  },
  components: {
    TableHeader,
    TableRow
  },
  data: function() {
    return {
      page: 1,
      showPaginator: false
    }
  },
  methods: {
    headerClicked: function(headerName) {
      if (this.tableHeaders[headerName].sortable) {
        this.$emit('sortByClicked', headerName)
      }
    },
    filterSelected: function(field, value) {
      this.$emit('filterSelected', field, value)
    },
    setShowPaginator: function() {
      this.showPaginator = this.totalRows > this.perPage
    },
    pageSelected: function(page) {
      this.$emit('pageSelected', page)
    }
  },
  watch: {
    totalRows: function() {
      this.page = 1
      this.setShowPaginator()
    }
  },
  beforeMount() {
    this.page = 1
    this.setShowPaginator()
  }
}
</script>
