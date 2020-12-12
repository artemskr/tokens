<template>
  <div class="search">
    <input v-model="searchTerm" type="text" placeholder="Search by Name"/>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {},
  data: function () {
    return {
      searchTerm: ''
    }
  },
  watch: {
    searchTerm: function(val) {
      if (val.length >= 1) {
        this.$emit('searchTriggered', val)
      }
    }
  }
}
</script>