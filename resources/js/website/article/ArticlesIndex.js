import React from "react";
import { Api, Routes, ApiCallHandler } from '../utility/Urls'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ArticleShow(props) {
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

    return <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>عنوان المقالة</th>
                <th>تصنيف المقالة</th>
            </tr>
        </thead>
        <tbody>
            {
                articles?.map((article, index) => (
                    <tr key={index}>
                        <td>  {article.id}   </td>
                        <td> <Link to={Routes.articleShow(article.id)}> {article.page.title}</Link></td>
                        <td><Link to={Routes.categoryShow(article.category_id)}> {article.category.name}</Link></td>
                    </tr>
                ))
            }
        </tbody>
    </Table>
}

