import axios from 'axios'
import { logError } from '../../commonFiles/helpers'
export const Routes = {
    dashboard: () => '/dashboard/',
    pageCreator: () => '/dashboard/createPage',
    pagesIndex: () => '/dashboard/pagesIndex',
    pageShow: (id) => id ? '/dashboard/pages/' + id : '/dashboard/pages/:id',
    pageEdit: (id) => id ? '/dashboard/pages/' + id + '/edit' : '/dashboard/pages/:id/edit',

    bookCreator: () => '/dashboard/books/create',
    booksIndex: () => '/dashboard/books',
    bookShow: (id) => id ? '/dashboard/books/' + id : '/dashboard/books/:id',
    bookEdit: (id) => id ? `/dashboard/books/${id}/edit` : '/dashboard/books/:id/edit',

    articleCreator: () => '/dashboard/articles/create',
    articlesIndex: () => '/dashboard/articles',
    articleShow: (id) => id ? '/dashboard/articles/' + id : '/dashboard/articles/:id',
    articleEdit: (id) => id ? '/dashboard/articles/' + id + '/edit' : '/dashboard/articles/:id/edit',

    categoryCreator: () => '/dashboard/categories/create',
    categoriesIndex: () => '/dashboard/categories',
    categoryShow: (id) => id ? '/dashboard/categories/' + id : '/dashboard/categories/:id',
    categoryEdit: (id) => id ? '/dashboard/categories/' + id + '/edit' : '/dashboard/categories/:id/edit',
}

export const Api = {
    createPage: async (title, meta_description, source_url, page_content) => {
        return await axios.post('/dashboardAPI/pages',
            { title: title, meta_description: meta_description, source_url: source_url, page_content: page_content }
        )
    },
    editPage: async (id, title, meta_description, source_url, page_content) => {
        return await axios.put('/dashboardAPI/pages/' + id,
            { title: title, meta_description: meta_description, source_url: source_url, page_content: page_content }
        )

    },
    fetchPages: async (params) => await axios.get('/dashboardAPI/pages/', { params: params }),
    fetchPage: async (id) => await axios.get('/dashboardAPI/pages/' + id),
    deletePage: async (id) => await axios.delete('/dashboardAPI/pages/' + id),

    createBook: async (title, description, thumbnail, author, activated, content_table) => await axios.post('/dashboardAPI/books/create', {
        title: title, description: description, thumbnail: thumbnail, author: author, activated: activated, content_table: content_table
    }),
    editBook: async (id, title, description, thumbnail, author, activated, content_table) => await axios.put(`/dashboardAPI/books/${id}`, {
        title: title, description: description, thumbnail: thumbnail, author: author, activated: activated, content_table: content_table
    }),
    fetchBooks: async (params) => await axios.get('/dashboardAPI/books/', { params: params }),
    fetchBook: async (id, params) => await axios.get('/dashboardAPI/books/' + id, { params: params }),

    createArticle: async (category_id, title, description, thumbnail, activated, page_content, source_url) =>
        await axios.post('/dashboardAPI/articles', {
            title: title,
            description: description,
            thumbnail: thumbnail,
            category_id: category_id,
            activated: activated,
            page_content: page_content,
            source_url: source_url
        }),
    fetchArticles: async (params) => await axios.get('/dashboardAPI/articles/', { params: params }),
    fetchArticle: async (id) => await axios.get('/dashboardAPI/articles/' + id),
    deleteArticle: async (id) => await axios.delete('/dashboardAPI/articles/' + id),
    editArticle: async (id, category_id, title, description, thumbnail, activated, page_content, source_url) => await axios.put(
        '/dashboardAPI/articles/' + id,
        { category_id: category_id, title: title, description: description, thumbnail: thumbnail, activated: activated, page_content: page_content, source_url: source_url }
    ),

    createCategory: async (name) => await axios.post('/dashboardAPI/categories', { name: name }),
    fetchCategories: async (params) => await axios.get('/dashboardAPI/categories/', { params: params }),
    fetchCategory: async (id, params) => await axios.get('/dashboardAPI/categories/' + id, { params: params }),
    editCategory: async (id, name) => await axios.put('/dashboardAPI/categories/' + id, { name: name }),
    deleteCategory: async (id) => await axios.delete('/dashboardAPI/categories/' + id),

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