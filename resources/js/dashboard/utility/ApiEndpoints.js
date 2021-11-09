import axios from 'axios'
import { logError } from './helpers'

export default {
    createPage: async (title, description, page_content, activated) => {
        return await axios.post('/dashboardAPI/pages', { title: title, description: description, page_content: page_content, activated: activated })
    },
    editPage: async (id, title, description, page_content, activated) => {
        return await axios.put('/dashboardAPI/pages/' + id, { title: title, description: description, page_content: page_content, activated: activated })

    },
    fetchPages: async (params) => await axios.get('/dashboardAPI/pages/', { params: params }),
    fetchPage: async (id) => await axios.get('/dashboardAPI/pages/' + id),
    deletePage: async (id) => await axios.delete('/dashboardAPI/pages/' + id),

    createBook: async (title, description, contentTable) => await axios.post('/dashboardAPI/books/create', {
        title: title, description: description, contentTable: contentTable
    }),
    fetchBooks: async (params) => await axios.get('/dashboardAPI/books/', { params: params }),
    fetchBook: async (id, params) => await axios.get('/dashboardAPI/books/' + id, { params: params }),
}