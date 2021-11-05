import axios from 'axios'
import { logError } from './helpers'

export default {
    createPage: async (title, page_content, activated) => {
        return await axios.post('/api/dashboard/pages', { title: title, page_content: page_content, activated: activated })
    },
    editPage: async (id, title, page_content, activated) => {
        return await axios.put('/api/dashboard/pages/' + id, { title: title, page_content: page_content, activated: activated })

    },
    fetchPages: async (setData) => {
        try {
            const response = await axios.get('/api/dashboard/pages/')
            setData(response.data)
            console.log('fetchPages', response.data)
        } catch (error) {
            logError(error, 'fetchPages')
        }
    },
    fetchPage: async (id) => await axios.get('/api/dashboard/pages/' + id)
}