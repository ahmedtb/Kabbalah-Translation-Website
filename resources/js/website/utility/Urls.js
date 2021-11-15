import axios from 'axios'
import { logError } from '../../commonFiles/helpers'

export const Routes = {
    home: () => '/',

    bookShow: (id) => id ? '/books/' + id : '/books/:id',
    booksIndex: () => '/books',
    bookBrowser: (id, sectionIndex) => (id && sectionIndex >= 0) ? `/books/${id}/section/${sectionIndex}` : '/books/:id/section/:sectionIndex',
    bookChapterShow: (id, chapterIndex) => (id && chapterIndex >= 0) ? `/books/${id}/chapter/${chapterIndex}` : '/books/:id/chapter/:chapterIndex',

    articleShow: (id) => id ? '/articles/' + id : '/articles/:id',
    articlesIndex: (params) => !params ? '/articles' : '/articles?' + Object.keys(params).map(key => key + '=' + params[key]).join('&'),

    // categoryShow: (id) => id ? '/categories/' + id : '/categories/:id',
    categoriesIndex: () => '/categories',
}

export const Api = {
    fetchBooks: async (params) => await axios.get('/api/books/', { params: params }),
    fetchBook: async (id, params) => await axios.get(`/api/books/${id}`, { params: params }),
    fetchSection: async (id, params) => await axios.get(`/api/books/section/${id}`, { params: params }),
    fetchPage: async (id, params) => await axios.get(`/api/pages/${id}`, { params: params }),

    fetchArticles: async (params) => await axios.get('/api/articles/', { params: params }),
    fetchArticle: async (id) => await axios.get('/api/articles/' + id),

    fetchCategories: async (params) => await axios.get('/api/categories/', { params: params }),
    fetchCategory: async (id) => await axios.get('/api/categories/' + id),
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