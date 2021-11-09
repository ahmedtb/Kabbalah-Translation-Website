import axios from 'axios'

export const Routes = {
    dashboard: () => '/dashboard/',
    pageCreator: () => '/dashboard/createPage',
    pagesIndex: () => '/dashboard/pagesIndex',
    pageShow: (id) => id ? '/dashboard/pages/' + id : '/dashboard/pages/:id',
    pageEdit: (id) => id ? '/dashboard/pages/' + id + '/edit' : '/dashboard/pages/:id/edit',

    bookCreator: () => '/dashboard/createBook',
    booksIndex: () => '/dashboard/books',
    bookShow: (id) => id ? '/dashboard/books/' + id : '/dashboard/books/:id',
}

export const Api = {
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

    createArticle: async (page_id, category_id, activated) => await axios.post('/dashboardAPI/articles', { page_id: page_id, category_id: category_id, activated: activated }),
    fetchArticle: async (id) => await axios.get('/dashboardAPI/articles/' + id),
}