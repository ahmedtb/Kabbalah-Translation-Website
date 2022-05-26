import axios from 'axios'
import { logError } from '../../commonFiles/helpers'
export const Routes = {
    dashboard: () => '/dashboard/',
    loginPage: () => '/dashboard/loginPage',

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

    glossaryTermCreator: () => '/dashboard/glossaryTermsIndex/create',
    glossaryTermsIndex: () => '/dashboard/glossaryTermsIndex',
    glossaryTermShow: (id) => id ? '/dashboard/glossaryTermsIndex/' + id : '/dashboard/glossaryTermsIndex/:id',
    glossaryTermEdit: (id) => id ? '/dashboard/glossaryTermsIndex/' + id + '/edit' : '/dashboard/glossaryTermsIndex/:id/edit',


}

const apiPrefix = 'dashboardAPI'
export const Api = {
    home: async () => await axios.get(`/${apiPrefix}/home`),

    login: async (username, password) => await axios.post(`/${apiPrefix}/login`, { username: username, password: password }),
    logout: async () => await axios.delete(`/${apiPrefix}/logout`),
    getAdmin: async () => await axios.get(`/${apiPrefix}/admin`),

    fetchBase64DataFromUrl: async (url) => await axios.get(`/${apiPrefix}/fetchBase64DataFromUrl`, { params: { url: url } }),

    createPage: async (title, about, description, source_url, page_content, book_id) => {
        return await axios.post(`/${apiPrefix}/pages`,
            { title: title, about: about, description: description, source_url: source_url, page_content: page_content, book_id: book_id }
        )
    },
    editPage: async (id, title, about, source_url, page_content, book_id) => {
        return await axios.put(`/${apiPrefix}/pages/` + id,
            { title: title, about: about, source_url: source_url, page_content: page_content, book_id: book_id }
        )

    },
    fetchPages: async (params) => await axios.get(`/${apiPrefix}/pages`, { params: params }),
    fetchPage: async (id) => await axios.get(`/${apiPrefix}/pages/${id}`),
    deletePage: async (id) => await axios.delete(`/${apiPrefix}/pages/${id}`),

    createBook: async (title, description, about, thumbnail, author, activated, content_table) => await axios.post(`/${apiPrefix}/books/create`, {
        title: title, description: description, about: about, thumbnail: thumbnail, author: author, activated: activated, content_table: content_table
    }),
    editBook: async (id, title, description, about, thumbnail, author, activated, content_table) => await axios.put(`/dashboardAPI/books/${id}`, {
        title: title, description: description, about: about, thumbnail: thumbnail, author: author, activated: activated, content_table: content_table
    }),
    fetchBooks: async (params) => await axios.get(`/${apiPrefix}/books/`, { params: params }),
    fetchBook: async (id, params) => await axios.get(`/${apiPrefix}/books/${id}`, { params: params }),
    bookThumbnail: (id) => `/${apiPrefix}/books/${id}/thumbnail`,

    createArticle: async (category_id, title, description, about, thumbnail, activated, page_content, source_url) =>
        await axios.post(`/${apiPrefix}/articles`, {
            title: title,
            description: description,
            about: about,
            thumbnail: thumbnail,
            category_id: category_id,
            activated: activated,
            page_content: page_content,
            source_url: source_url
        }),
    fetchArticles: async (params) => await axios.get(`/${apiPrefix}/articles/`, { params: params }),
    fetchArticle: async (id) => await axios.get(`/${apiPrefix}/articles/${id}`),
    deleteArticle: async (id) => await axios.delete(`/${apiPrefix}/articles/${id}`),
    editArticle: async (id, category_id, title, description, about, thumbnail, activated, page_content, source_url) => await axios.put(
        `/${apiPrefix}/articles/` + id,
        { category_id: category_id, title: title, description: description, about: about, thumbnail: thumbnail, activated: activated, page_content: page_content, source_url: source_url }
    ),
    articleThumbnail: (id) => `/${apiPrefix}/articles/${id}/thumbnail`,

    createCategory: async (name) => await axios.post(`/${apiPrefix}/categories`, { name: name }),
    fetchCategories: async (params) => await axios.get(`/${apiPrefix}/categories/`, { params: params }),
    fetchCategory: async (id, params) => await axios.get(`/${apiPrefix}/categories/${id}`, { params: params }),
    editCategory: async (id, name) => await axios.put(`/${apiPrefix}/categories/${id}`, { name: name }),
    deleteCategory: async (id) => await axios.delete(`/${apiPrefix}/categories/${id}`),

    createGlossaryTerm: async (name) => await axios.post(`/${apiPrefix}/glossaryTerms`, { name: name }),
    fetchGlossaryTerms: async (params) => await axios.get(`/${apiPrefix}/glossaryTerms/`, { params: params }),
    fetchGlossaryTerm: async (id, params) => await axios.get(`/${apiPrefix}/glossaryTerms/${id}`, { params: params }),
    editGlossaryTerm: async (id, name) => await axios.put(`/${apiPrefix}/glossaryTerms/${id}`, { name: name }),
    deleteGlossaryTerm: async (id) => await axios.delete(`/${apiPrefix}/glossaryTerms/${id}`),
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