import React from 'react'


import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Routes } from '../utility/Urls'

export default function ArticlesCardsRender(props) {
    const articles = props.articles

    return <Col xs={12} className='bg-white my-3'>
        <Col xs={10} className='mx-auto'>
            {
                articles?.map((article, index) => <Row key={index} className='my-2'>
                    <Col xs={2}>
                        <img src={article.thumbnail} className='maxWidth100' />
                    </Col>
                    <Col xs={10}>
                        <h4>
                            {article.title}
                        </h4>
                        <Link to={Routes.articlesIndex({ category_id: article.category_id })}>{article.category?.name}</Link>
                        <div>
                            {article.description}
                        </div>
                        <Link to={Routes.articleShow(article.id)} >read more</Link>
                    </Col>
                </Row>)
            }
        </Col>
    </Col>
}