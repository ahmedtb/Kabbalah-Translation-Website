import React from 'react'
import { Api, Routes, ApiCallHandler } from '../utility/URLs'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>العنوان</th>
                    <th>العنوان</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    articles?.map((article, index) => (
                        <tr key={index}>
                            <td> <Link to={Routes.articleShow(article.id)}> {article.id}  </Link> </td>
                            <td>{article.page_id}</td>
                            <td>{article.category_id}</td>
                            <td onClick={() => deleteArticle(article.id)}>حدف</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}