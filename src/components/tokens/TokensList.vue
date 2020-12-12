<template>  
  <div>
    <div class="table-controls">
      <Search/>
    </div>
    <Table :tableData="accounts" :filterBy="filterBy" :dateTimeFields="dateTimeFields" @sortByClicked="sortByClicked" @filterSelected="filterSelected"/>
    <Paginator :length="accounts.length"/>
  </div>
</template>

<script>
import Paginator from '@/components/common/Paginator.vue'
import Search from '@/components/common/Search.vue'
import Table from '@/components/common/table/Table.vue'
import service from  '@/services/ApiService.js'

export default {
  name: 'TokensList',  
  props: {},
  components: {
    Table,
    Search,
    Paginator
  },
  data: function() {
    return {
      accounts: [],
      page: 1,
      perPage: 10,
      sortBy: null,
      sortDirection: 'desc',
      filterBy: {
        'Country': [],
        'mfa': []
      },
      filterValues: {},
      dateTimeFields: [
        'dob',
        'createdDate'
      ]
    }
  },
  methods: {
    sortByClicked: function(field) {
      this.sortBy = field
      this.flipDirection()
      this.setData()
    },
    filterSelected: function(field, value) {
      if (value !== '') {
        this.filterValues[field] = value
      } else {
        delete this.filterValues[field]
      }
      this.setData()
    },
    flipDirection: function() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    },
    setFilterBy: async function() {
      for (let field in this.filterBy) {
        this.filterBy[field] = await service.getOptionsForFieled(field)
      }
    },
    setData: async function() {
      this.accounts = await service.getUserData(
          this.page,
          this.perPage,
          this.sortBy,
          this.sortDirection,
          this.filterValues
      )
    }
  },
  beforeMount() {
    this.setFilterBy()
    this.setData()
  } 
}
</script>