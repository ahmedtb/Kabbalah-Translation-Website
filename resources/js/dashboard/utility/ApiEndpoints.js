import axios from 'axios'
import { logError } from './helpers'

export default {
    createPage: async (title, description, page_content, activated) => {
        return await axios.post('/dashboardAPI/pages', { title: title, description: description, page_content: page_content, activated: activated })
    },
    editPage: async (id, title, description, page_content, activated) => {
        return await axios.put('/dashboardAPI/pages/' + id, { title: title, description: description, page_content: page_content, activated: activated })

    },
    fetchPages: async (setData) => {
        try {
            const response = await axios.get('/dashboardAPI/pages/')
            setData(response.data)
            console.log('fetchPages', response.data)
        } catch (error) {
            logError(error, 'fetchPages')
        }
    },
    fetchPage: async (id) => await axios.get('/dashboardAPI/pages/' + id),
    deletePage: async (id) => await axios.delete('/dashboardAPI/pages/' + id),

}