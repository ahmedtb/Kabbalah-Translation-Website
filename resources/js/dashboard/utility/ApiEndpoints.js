import { get, post } from './AxiosCalls'

export default {
    createPage: '/api/dashboard/pages',
    fetchPages: '/api/dashboard/pages',
    fetchPage: (id, callerIdentifier = null, setData = null) => get('/api/dashboard/pages/' + id, null, callerIdentifier, setData)
}