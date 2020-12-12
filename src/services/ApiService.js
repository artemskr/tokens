import userData from '@/data/accounts'

// using async just because in real app it would be API calls
export default {
    getUserData: async function(page = 1, perPage = 10, sortBy, sortDirection = 'asc', filterValues = {}, searchTerm) {
        let data = this.getNormalisedData()
        if (sortBy && typeof Object.keys(data[0])[sortBy] !== undefined) {
            if (sortDirection === 'asc') {
                data = data.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0))
            } else {
                data = data.sort((a, b) => (a[sortBy] > b[sortBy]) ? -1 : ((b[sortBy] > a[sortBy]) ? 1 : 0))
            }
        }

        for (let field in filterValues) {
            data = data.filter(item => {
                return item[field] === filterValues[field]
            })
        }
        if (searchTerm && searchTerm.length) {
            searchTerm = searchTerm.toLowerCase()
            data = data.filter(item => {
                return item['First Name'].toLowerCase().indexOf(searchTerm) !== -1 || item['Last Name'].indexOf(searchTerm) !== -1
            })
        }
        return data.slice(perPage * (page - 1), page * perPage)
    },

    getOptionsForFieled: async function(field) {
        let data = this.getNormalisedData()
        return [...new Set(data.map(item => item[field]))].filter(el => el != null)
    },

    getNormalisedData: function() {
        userData.forEach(item => {
            if (item.mfa === 'null') {
                item.mfa = null
            }
        })
        return userData
    },

    getUserDataFields: async function() {
        return Object.keys(userData[0])
    }
}
