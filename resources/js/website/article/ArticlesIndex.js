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
        let linkParams = Object.fromEntries(new URLSearchParams(link?.split('?')[1]))

        ApiCallHandler(
            async () => (
                // link ?
                // await axios.get(link, { params: { ...params, with: [ 'category'] } }) :
                await Api.fetchArticles({ with: ['category'], ...params, ...linkParams })
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
        <div className="col-6 d-flex justify-content-start my-2">

            <input placeholder="ابحث باسم المقال" className="form-control bg-white" onChange={e => setsearch(e.target.value)} />
            <button className="mx-2 btn btn-success" onClick={() => fetchArticles(null, { title: search })} >بحث</button>
        </div>
        <ArticlesCardsRender articles={articles} />

        <Pagination fetchPage={fetchArticles} links={links} />
    </div>
}

