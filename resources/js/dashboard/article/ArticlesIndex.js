import React from 'react'
import { Api, Routes, ApiCallHandler } from '../utility/URLs'
import ArticlesTable from '../components/ArticlesTable'
import { TextFilter, ScopeFilter, SelectFilter } from '../components/Filters'
import Pagination from '../../commonFiles/Pagination'
import { useHistory } from "react-router-dom"

export default function ArticlesIndex(props) {
    const history = useHistory()

    const [articles, setarticles] = React.useState([])
    const [links, setlinks] = React.useState([])

    function fetchArticles(link = null, params = null) {
        let linkParams = Object.fromEntries(new URLSearchParams(link?.split('?')[1]))
        let allParams = { page_size: 10, with: 'category', ...linkParams, ...params }
        console.log('fetchArticles allParams', allParams)
        ApiCallHandler(
            async () => await Api.fetchArticles(allParams),
            (data) => { setarticles(data.data); setlinks(data.links ?? []); },
            'ArticlesIndex fetchArticles',
            true
        )
        history.replace({
            pathname: window.location.pathname,
            search: (new URLSearchParams(allParams)).toString()
        })
    }

    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));
        fetchArticles(null, params)
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
                fetchPage={(newparams) => fetchArticles(null, newparams)}
                property={'title'}
                label={'عنوان المقال'}
            />
            <TextFilter
                fetchPage={(newparams) => fetchArticles(null, newparams)}
                property={'source_url'}
                label={'رابط الاصلي للمقال'}
            />
            <SelectFilter
                options={[
                    { value: true, name: 'مفعلة' },
                    { value: false, name: 'غير مفعلة' }
                ]}
                fetchPage={(newparams) => fetchArticles(null, newparams)}
                property={'activated'}
                label={'حالة التفعيل'}
            />
            <ArticlesTable articles={articles} deleteArticle={deleteArticle} />
            <Pagination fetchPage={fetchArticles} links={links} />

        </div>
    )
}