import moment from 'moment'

export default {
  formatDateForDisplay:  function(value, format = 'DD/MM/YYYY') {
    return moment(value).format(format)
  }
}
