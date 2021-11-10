import axios from 'axios'
import { logError } from './helpers'

export const Routes = {
    home: () => '/',
    bookShow: (id) => id ? '/books/' + id : '/books/:id',
    booksIndex: () => '/books',
    bookBrowser: (id, section_id) => (section_id) ? `/books/${id}/section/${section_id}` : '/books/:id/section/:section_id'
}

export const Api = {
    fetchBooks: async (params) => await axios.get('/api/books/', { params: params }),
    fetchBook: async (id, params) => await axios.get(`/api/books/${id}`, { params: params }),
    fetchSection: async (id, params) => await axios.get(`/api/books/section/${id}`, { params: params }),
    fetchPage: async (id, params) => await axios.get(`/api/pages/${id}`, { params: params }),

}

export async function ApiCallHandler(ApiEndpoint, setData = null, Identifier = null, logData = false) {
    try {
        const response = await ApiEndpoint()
        if (setData)
            setData(response.data)
        if (Identifier && logData)
            console.log(Identifier, response.data)
    } catch (error) {
        if (Identifier)
            logError(error, Identifier)
    }
}