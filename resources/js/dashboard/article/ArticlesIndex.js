import React from 'react'
import ArticlesTable from '../components/ArticlesTable'
import ApiEndpoints from '../utility/ApiEndpoints'
import { ApiCallHandler } from '../utility/helpers'

export default function ArticlesIndex(props) {
    const [pages, setpages] = React.useState([])
    async function setup() {
        ApiCallHandler(async () => await ApiEndpoints.fetchArticles(),
            setpages,
            'ArticlesIndex setup',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])

    function deleteArticle(id) {
        ApiCallHandler(async () => await ApiEndpoints.deleteArticle(id),
            setup,
            'ArticlesIndex deleteArticle',
            true
        )
    }
    return (
        <div>
            <ArticlesTable pages={pages} deleteArticle={deleteArticle} />
        </div>
    )
}