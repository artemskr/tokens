<template>
  <div>
    <div class="table-controls">
      <div class="float-lft">
        <Search @searchTriggered="searchTriggered"/>
      </div>
      <div class="float-rgt">
        <button v-on:click.stop.prevent="exportToCSV('data.csv')" class="button_a">Export To CSV File</button>
      </div>
    </div>
    <Table :tableData="accounts" :tableHeaders="tableHeaders" :filterBy="filterBy" :dateTimeFields="dateTimeFields"
           @sortByClicked="sortByClicked" @filterSelected="filterSelected"/>
    <Paginator :length="accounts.length"/>
  </div>
</template>

<script>
import Paginator from '@/components/common/Paginator.vue'
import Search from '@/components/common/Search.vue'
import Table from '@/components/common/table/Table.vue'
import service from '@/services/ApiService.js'

export default {
  name: 'TokensList',
  props: {},
  components: {
    Table,
    Search,
    Paginator
  },
  data: function () {
    return {
      accounts: [],
      tableHeaders: [],
      page: 1,
      perPage: 10,
      sortBy: null,
      sortDirection: 'desc',
      filterBy: {
        'Country': [],
        'mfa': []
      },
      filterValues: {},
      searchTerm: '',
      dateTimeFields: [
        'dob',
        'createdDate'
      ]
    }
  },
  methods: {
    sortByClicked: function (field) {
      this.sortBy = field
      this.flipDirection()
      this.setData()
    },
    filterSelected: function (field, value) {
      if (value !== '') {
        this.filterValues[field] = value
      } else {
        delete this.filterValues[field]
      }
      this.setData()
    },
    flipDirection: function () {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    },
    setFilterBy: async function () {
      for (let field in this.filterBy) {
        this.filterBy[field] = await service.getOptionsForFieled(field)
      }
    },
    searchTriggered(val) {
      this.searchTerm = val
      this.setData()
    },
    setData: async function () {
      this.accounts = await service.getUserData(
          this.page,
          this.perPage,
          this.sortBy,
          this.sortDirection,
          this.filterValues,
          this.searchTerm
      )
    },
    setTableHeaders: async function () {
      this.tableHeaders = await service.getUserDataFields()
    },
    exportToCSV: function (fileName) {
      const csv = []
      const row = []
      this.tableHeaders.forEach(item => {
        row.push(item)
      })
      csv.push(row.join(','))
      this.accounts.forEach(item => {
        const row = []
        for (let el in item) {
          row.push(item[el])
        }
        csv.push(row.join(','))
      })
      this.downloadCSV(csv.join('\n'), fileName)
    },
    downloadCSV: function (csv, fileName) {
      const csvFile = new Blob([csv], {type: 'text/csv'})
      const downloadLink = document.createElement('a')
      downloadLink.download = fileName
      downloadLink.href = window.URL.createObjectURL(csvFile)
      downloadLink.style.display = 'none'
      document.body.appendChild(downloadLink)
      downloadLink.click()
    }
  },
  beforeMount() {
    this.setFilterBy()
    this.setData()
    this.setTableHeaders()
  }
}
</script>