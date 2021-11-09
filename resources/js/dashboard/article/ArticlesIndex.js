import React from 'react'
import {Api} from '../utility/URLs'
import { ApiCallHandler } from '../utility/helpers'

export default function ArticlesIndex(props) {
    const [articles, setarticles] = React.useState([])
    async function setup() {
        ApiCallHandler(async () => await Api.fetchArticles(),
            setarticles,
            'ArticlesIndex setup',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])

    function deleteArticle(id) {
        ApiCallHandler(async () => await Api.deleteArticle(id),
            setup,
            'ArticlesIndex deleteArticle',
            true
        )
    }
    return (
        <div>
        </div>
    )
}