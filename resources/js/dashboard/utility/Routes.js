const Routes = {
    dashboard: '/dashboard/',
    pageCreator: '/dashboard/createPage',
    pagesIndex: '/dashboard/pagesIndex',
    pageShow: (id) => id ? '/dashboard/pages/' + id : '/dashboard/pages/:id',
    pageEdit: (id) => id ? '/dashboard/pages/' + id + '/edit' : '/dashboard/pages/:id/edit'

}

export default Routes;

