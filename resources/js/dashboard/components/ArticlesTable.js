import React from "react"
import { Table } from "react-bootstrap"
import { truncate, ApiCallHandler } from "../../commonFiles/helpers"
import { Link } from "react-router-dom"
import { Routes } from "../utility/URLs"

export default function ArticlesTable(props) {
    const articles = props.articles
    const deleteArticle = props.deleteArticle


    function hasPage(Obj, Or) {
        if (articles[0]?.page_without_content)
            return Obj
        else return Or
    }

    function hasCategory(Obj, Or) {
        if (articles[0]?.category)
            return Obj
        else return Or
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>عنوان المقالة</th>
                    <th>الصفحة</th>
                    <th>التصنيف</th>
                    <th>مفعلة؟</th>
                    <th>الوصف</th>
                    <th>thumbnail</th>
                    {deleteArticle ? <th></th> : null}
                </tr>
            </thead>
            <tbody>
                {
                    articles?.map((article, index) => (
                        <tr key={index}>
                            <td> <Link to={Routes.articleShow(article.id)}> {article.id}  </Link> </td>
                            <td>{article.title}</td>

                            <td>
                                <Link to={Routes.pageShow(article.page_id)}>
                                    {hasPage(article.page_without_content?.title, article.page_id)}
                                </Link>
                            </td>

                            <td>
                                <Link to={Routes.categoryShow(article.category_id)}>
                                    {hasCategory(article.category?.name, article.category_id)}
                                </Link>
                            </td>

                            <td>{article.activated ? 'مفعل' : 'غير مفعل'}</td>
                            <td>{truncate(article.description)}</td>
                            <td><img src={article.thumbnail} className='maxWidth100' /></td>

                            {deleteArticle ? <td onClick={() => deleteArticle(article.id)}>حدف</td> : null}
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )

}