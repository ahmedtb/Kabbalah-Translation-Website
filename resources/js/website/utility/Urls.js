import axios from 'axios'
import { logError } from '../../commonFiles/helpers'

export const Routes = {
    home: () => '/',

    bookShow: (id) => id ? '/books/' + id : '/books/:id',
    booksIndex: () => '/books',
    bookBrowser: (id, sectionPath) => (id && sectionPath != undefined) ? `/books/${id}/section/${sectionPath}` : '/books/:id/section/:sectionPath',
    bookChapterShow: (id, chapterPath) => (id && chapterPath != undefined) ? `/books/${id}/chapter/${chapterPath}` : '/books/:id/chapter/:chapterPath',

    articleShow: (id) => id ? '/articles/' + id : '/articles/:id',
    articlesIndex: (params) => !params ? '/articles' : '/articles?' + Object.keys(params).map(key => key + '=' + params[key]).join('&'),

    // categoryShow: (id) => id ? '/categories/' + id : '/categories/:id',
    categoriesIndex: () => '/categories',
}

export const Api = {
    fetchBooks: async (params) => await axios.get('/api/books', { params: params }),
    fetchBook: async (id, params) => await axios.get(`/api/books/${id}`, { params: params }),
    fetchSection: async (id, params) => await axios.get(`/api/books/section/${id}`, { params: params }),
    fetchPage: async (id, params) => await axios.get(`/api/pages/${id}`, { params: params }),
    bookThumbnail: (id) => `/api/books/${id}/thumbnail`,
    booksSuggestion: (params) => axios.get('/api/books/suggestion', { params: params }),

    fetchArticles: async (params) => await axios.get('/api/articles', { params: params }),
    fetchArticle: async (id) => await axios.get('/api/articles/' + id),
    articleThumbnail: (id) => `/api/articles/${id}/thumbnail`,
    articlesSuggestion: () => axios.get('/api/articles/suggestion'),

    fetchCategories: async (params) => await axios.get('/api/categories', { params: params }),
    fetchCategory: async (id) => await axios.get('/api/categories/' + id),
}

export async function ApiCallHandler(ApiEndpoint, setData = null, Identifier = null, logData = false) {
    try {
        const response = await ApiEndpoint()
        if (setData)
            setData(response.data)
        if (Identifier && logData)
            console.log(Identifier, response.data)
        return response
    } catch (error) {
        if (Identifier)
            logError(error, Identifier)
    }
}