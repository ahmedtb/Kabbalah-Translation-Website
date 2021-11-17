import React from 'react'
import { Api, Routes, ApiCallHandler } from '../utility/URLs'
import ArticlesTable from '../components/ArticlesTable'
import { TextFilter } from '../components/Filters'
import Pagination from '../../commonFiles/Pagination'
export default function ArticlesIndex(props) {
    const [articles, setarticles] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    function fetchArticles(link = null, params = null) {
        ApiCallHandler(
            async () => (link ?
                await axios.get(link, { params: { ...params, with: ['category'], page_size: 20 } }) :
                await Api.fetchArticles({ ...params, with: ['category'], page_size: 20 })
            ),
            (data) => { setarticles(data.data); setlinks(data.links ?? []); setparams(params) },
            'ArticlesIndex fetchArticles',
            true
        )
    }

    React.useEffect(() => {
        fetchArticles()
    }, [])
    function deleteArticle(id) {
        if (confirm("هل تود فعلا حدف التصنيف " + id)) {
            ApiCallHandler(async () => await Api.deleteArticle(id),
                data => fetchArticles(),
                'ArticlesIndex deleteArticle',
                true
            )
        }
    }

    return (
        <div>
            <TextFilter
                params={params}
                fetchPage={(newparams) => fetchArticles(null, newparams)}
                property={'title'}
                label={'عنوان المقال'}
            />
            <ArticlesTable articles={articles} deleteArticle={deleteArticle} />
            <Pagination fetchPage={fetchArticles} links={links} />

        </div>
    )
}