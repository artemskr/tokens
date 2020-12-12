<template>
  <div class="filter">
    <select v-model="selectedFilter" class="select-css">
      <option selected></option>
      <option v-for="(f, index) in filterBy" :selected="selectedFilter === f" :key="`filter-opt-${field}-${index}`">{{ f }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Filter',
  props: {
    filterBy: Array,
    field: String
  },
  data: function() {
    return {
      selectedFilter: 0
    }
  },
  watch: {
    selectedFilter: function (value) {
      this.$emit('filterSelected', this.field, value)
    }
  }
}
</script>
