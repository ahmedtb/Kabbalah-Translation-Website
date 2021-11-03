import axios from 'axios'
import logError from './logError'

export default {
    createPage: async (page_content, activated) => {
        try {
            const response = await axios.post('/api/dashboard/pages', { page_content: page_content, activated: activated })
            console.log('createPage', response.data)
        } catch (error) {
            logError(error, 'createPage')
        }
    },
    editPage: async (id, page_content, activated) => {
        try {
            const response = await axios.put('/api/dashboard/pages/' + id, { page_content: page_content, activated: activated })
            console.log('createPage', response.data)
        } catch (error) {
            logError(error, 'createPage')
        }
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
    fetchPage: async (id, setData) => {
        try {
            const response = await axios.get('/api/dashboard/pages/' + id)
            setData(response.data)
            // console.log('fetchPage', response.data)
        } catch (error) {
            logError(error, 'fetchPage')
        }
    }
}