<template>
  <div class="tbl">
    <table class="styled-table">
      <TableHeader :header="header" :filterBy="filterBy" @headerClicked="headerClicked" @filterSelected="filterSelected"/>
      <tbody>
        <TableRow :rowData="item" :rowIndex="index" :dateTimeFields="dateTimeFields" :key="`tbl-r-${index}`" v-for="(item, index) in tableData"/>
      </tbody>
    </table>
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
    dateTimeFields: Array
  },
  components: {
    TableHeader,
    TableRow
  },
  data: function() {
    return {}
  },
  computed: {
    header: function() {  
      return this.tableData[0] && Object.keys(this.tableData[0])
    }
  },
  methods: {
    headerClicked: function(headerName) {
      switch(headerName) {
        case 'amt':
        case 'createdDate':
          this.$emit('sortByClicked', headerName)
          break
        default:
      }
    },
    filterSelected: function(field, value) {
      this.$emit('filterSelected', field, value)
    }
  }
}
</script>
