<template>
  <tr>
    <td v-for="(r, field) in rowData" :key="`tabl-cell-${rowIndex}-${field}`">{{ formatForDisplay(r, field) }}</td>
 </tr>
</template>

<script>
import util from '@/lib/util'

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
        return util.formatDateForDisplay(value, 'DD/MM/YYYY')
      }
      return value
    }
  }
}
</script>