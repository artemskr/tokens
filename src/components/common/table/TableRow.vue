<template>
  <tr>
    <td v-for="(r, field) in rowData" :key="`tabl-cell-${rowIndex}-${field}`">{{ formatForDisplay(r, field) }}</td>
 </tr>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TableRow',
  props: {
    rowData: Object,
    rowIndex: Number,
    dateTimeFields: Array
  },
  methods: {
    formatForDisplay: function(value, field) {
      if (this.dateTimeFields.includes(field)) {
        return moment(value).format('DD/MM/YYYY')
      }
      return value
    }
  }
}
</script>