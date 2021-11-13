import React from 'react'
import { Api, Routes, ApiCallHandler } from '../utility/URLs'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ArticlesTable from '../components/ArticlesTable'

export default function ArticlesIndex(props) {
    const [articles, setarticles] = React.useState([])

    async function setup() {
        ApiCallHandler(async () => await Api.fetchArticles({ with: ['category', 'pageWithoutContent'] }),
            setarticles,
            'ArticlesIndex setup',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])
    function deleteArticle(id) {
        if (confirm("هل تود فعلا حدف التصنيف " + id)) {
            ApiCallHandler(async () => await Api.deleteArticle(id),
                setup,
                'ArticlesIndex deleteArticle',
                true
            )
        }
    }

    return (
        <ArticlesTable articles={articles} deleteArticle={deleteArticle} />
    )
}