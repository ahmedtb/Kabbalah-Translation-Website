import React from "react";
import { Api, Routes, ApiCallHandler } from '../utility/Urls'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from "axios";
import Pagination from "../../commonFiles/Pagination";
import PageContentRender from '../components/PageContentRender'
import ArticlesCardsRender from '../components/ArticlesCardsRender'

export default function ArticleShow(props) {
    const [articles, setarticles] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    function fetchArticles(link = null, params = null) {
        ApiCallHandler(
            async () => (link ?
                await axios.get(link, { params: { ...params, with: [ 'category'] } }) :
                await Api.fetchArticles({ ...params, with: [ 'category'] })
            ),
            (data) => { setarticles(data.data); setlinks(data.links ?? []); setparams(params) },
            'ArticlesIndex fetchArticles',
            true
        )
    }
    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));
        fetchArticles(null, params)
    }, [])
    const [search, setsearch] = React.useState(null)


    return <div>
        search <input onChange={e => setsearch(e.target.value)} />
        <input type='submit' onClick={() => fetchArticles(null, { search: search })} />
        <ArticlesCardsRender articles={articles} />
        
        {/* {

            articles?.map((article, index) => (
                <div key={index}>
                    <h2> <Link to={Routes.articleShow(article.id)}> {article.page?.title}</Link></h2>
                    <div><Link to={Routes.articlesIndex({ category_id: article.category_id })}> {article.category?.name}</Link></div>
                    <PageContentRender page={article.page} />
                </div>
            ))
        } */}

        <Pagination fetchPage={fetchArticles} links={links} />
    </div>
}

