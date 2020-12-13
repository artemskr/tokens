<template>
  <thead>
    <tr>
      <th v-for="(h, index) in header" :key="`tbl-h-${index}`" @click="headerClicked(h)" :class="wideCell(index)">{{h}}</th>
    </tr>
    <tr>
      <th v-for="(h, index) in header" :key="`tbl-h-2-${index}`" @click="headerClicked(h)" style="padding-top: 0">
          <FilterDropdown v-if="showFilter(h)" :filterBy="filterBy[h]" :field="h" @filterSelected="filterSelected"/>
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
    header: Array,
    filterBy: Object
  },
  methods: {
    headerClicked: function(headerName) {
      this.$emit('headerClicked', headerName)
    },
    showFilter: function (headerName) {
      return Object.keys(this.filterBy).includes(headerName)
    },
    filterSelected: function(field, value) {
      this.$emit('filterSelected', field, value)
    },
    wideCell: function(index) {
      return (index === this.header.length - 1) || index === 3 ? 'wide-cell': ''
    }
  }
}
</script>