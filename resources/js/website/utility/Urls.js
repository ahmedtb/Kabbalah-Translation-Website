import axios from 'axios'
import { logError } from './helpers'

export const Routes = {
    home: () => '/',
}


export const ApiEndpoints = {
    fetchBooks: async (params) => await axios.get('/api/books/', { params: params }),
    fetchBook: async (id, params) => await axios.get('/api/books/' + id, { params: params }),
}