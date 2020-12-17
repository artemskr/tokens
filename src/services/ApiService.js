import userData from '@/data/accounts'

// using async just because in real app it would be API calls
// all functions below is just mimicking API calls with page or (limit, offset), orderBy, search term...
export default {
    getUserData: async function(parameters) {
        const defaults = {
            page: 1,
            perPage: 10,
            sortDirection: 'asc',
            filterValues: {}
        }
        const params = Object.assign(defaults, parameters)
        let data = this.getNormalisedData()
        if (params.sortBy && typeof Object.keys(data[0])[params.sortBy] !== undefined) {
            if (params.sortDirection === 'asc') {
                data = data.sort((a, b) => (a[params.sortBy] > b[params.sortBy]) ? 1 : ((b[params.sortBy] > a[params.sortBy]) ? -1 : 0))
            } else {
                data = data.sort((a, b) => (a[params.sortBy] > b[params.sortBy]) ? -1 : ((b[params.sortBy] > a[params.sortBy]) ? 1 : 0))
            }
        }

        for (let field in params.filterValues) {
            data = data.filter(item => {
                return item[field] === params.filterValues[field]
            })
        }
        if (params.searchTerm && params.searchTerm.length) {
            params.searchTerm = params.searchTerm.toLowerCase()
            data = data.filter(item => {
                return item['First Name'].toLowerCase().indexOf(params.searchTerm) !== -1 ||
                  item['Last Name'].toLowerCase().indexOf(params.searchTerm) !== -1
            })
        }
        return {
            accounts: data.slice(params.perPage * (params.page - 1), params.page * params.perPage),
            total: data.length
        }
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
