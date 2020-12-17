<template>
  <thead>
    <tr>
      <th v-for="(h, index) in headers"
          :key="`tbl-h-${index}`"
          @click="headerClicked(h)"
          :class="wideCell(h)">{{h}}</th>
    </tr>
    <tr>
      <th v-for="(h, index) in headers"
          :key="`tbl-h-2-${index}`"
          @click="headerClicked(h)">

          <FilterDropdown v-if="showFilter(h)"
                          :filterBy="filterBy[h]"
                          :field="h"
                          @filterSelected="filterSelected"/>
      </th>
    </tr>
  </thead>
</template>

<script>
import FilterDropdown from '@/components/common/FilterDropdown'

export default {
  name: 'TableHeader',
  components: {
    FilterDropdown
  },
  props: {
    headers: Array,
    tableHeaders: Object,
    filterBy: Object
  },
  methods: {
    headerClicked: function(headerName) {
      if (this.tableHeaders[headerName].sortable) {
        this.$emit('headerClicked', headerName)
      }
    },
    showFilter: function (headerName) {
      return this.tableHeaders[headerName].filterable
    },
    filterSelected: function(field, value) {
      this.$emit('filterSelected', field, value)
    },
    wideCell: function(headerName) {
      return this.tableHeaders[headerName].wideCell ? 'wide-cell': ''
    }
  }
}
</script>