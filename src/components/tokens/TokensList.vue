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
    <Table :tableData="accounts"
           :tableHeaders="tableHeaders"
           :filterBy="filterBy"
           :dateTimeFields="dateTimeFields"
           @sortByClicked="sortByClicked"
           @filterSelected="filterSelected"
           @pageSelected="pageSelected"
           :perPage="perPage"
           :totalRows="totalRows"
    />
  </div>
</template>

<script>
import Search from '@/components/common/Search.vue'
import Table from '@/components/common/table/Table.vue'
import service from '@/services/ApiService.js'
import util from '@/lib/util'

export default {
  name: 'TokensList',
  props: {},
  components: {
    Table,
    Search
  },
  data: function () {
    return {
      accounts: [],
      tableHeaders: {},
      page: 1,
      perPage: 10,
      totalRows: 200,
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
      this.page = 1
    },
    filterSelected: function (field, value) {
      if (value !== '') {
        this.filterValues[field] = value
      } else {
        delete this.filterValues[field]
      }
      this.setData()
    },
    pageSelected: function(page) {
      this.page = page
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
      const {accounts, total} = await service.getUserData({
           page: this.page,
           perPage: this.perPage,
           sortBy: this.sortBy,
           sortDirection: this.sortDirection,
           filterValues: this.filterValues,
           searchTerm: this.searchTerm
          })
      this.accounts = accounts
      this.totalRows = total
      this.page = 1
    },
    setTableHeaders: async function () {
      const headers = await service.getUserDataFields()
      headers.forEach(item => {
        this.tableHeaders[item] = {}
        if (['email', 'ReferredBy'].includes(item)) {
          this.tableHeaders[item].wideCell = true
        }
        if (['amt', 'createdDate'].includes(item)) {
          this.tableHeaders[item].sortable = true
        }
        if (['Country', 'mfa'].includes(item)) {
          this.tableHeaders[item].filterable = true
        }
      })
    },
    exportToCSV: function (fileName) {
      const csv = []
      const row = []
      Object.keys(this.tableHeaders).forEach(item => {
        row.push(item)
      })
      csv.push(row.join(','))
      this.accounts.forEach(item => {
        const row = []
        for (let el in item) {
          let value = item[el]
          if (this.dateTimeFields.includes(el)) {
            value = util.formatDateForDisplay(value)
          }
          row.push(value)
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