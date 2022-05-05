import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Routes } from '../utility/Urls'

export default function ArticlesCardsRender(props) {
    const articles = props.articles

    if (!articles?.length)
        return null

    return articles?.map((article, index) => <div key={index} className='col-10 mx-auto my-4 p-2 border rounded d-flex'>

        {article.thumbnail ? <Col xs={2}>
            <img src={article.thumbnail} className='maxWidth100' />
        </Col> : null}

        <div className='flex-grow-1 p-2'>
            <h4>
                {article.title}
            </h4>
            <Link to={Routes.articlesIndex({ category_id: article.category_id })}>{article.category?.name}</Link>
            <div>
                {article.description}
            </div>
            <div className='d-flex justify-content-end'>
                <Link to={Routes.articleShow(article.id)} >إقرا</Link>
            </div>
        </div>
    </div>)

}