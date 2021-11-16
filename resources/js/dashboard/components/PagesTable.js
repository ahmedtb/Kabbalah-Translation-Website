import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { HeaderComponentClass, ImageComponentClass, LinkComponentClass, ParagraphComponentClass, TitleComponentClass } from '../../commonFiles/PageComponents/structure'
import { Routes } from '../utility/URLs'


export default function PagesTable(props) {
    const pages = props.pages
    const deletePage = props.deletePage

    function hasArticles(Obj, Or = null) {
        return pages[0]?.articles ? Obj : Or
    }


    return (
        <Table striped bordered hover responsive >
            <thead>
                <tr>
                    <th>#</th>
                    <th>العنوان</th>
                    {hasArticles(<th>مقالات</th>)}

                    <th>معلومات عن الصفحة</th>
                    <th>رابط المصدر</th>

                    <th></th>

                </tr>
            </thead>
            <tbody>
                {
                    pages?.map((page, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={Routes.pageShow(page.id)}>
                                    {page.id}
                                </Link>
                            </td>
                            <td>{page.title}</td>
                            {hasArticles(<td>
                                {page.articles?.map((article, index) => article.title)}
                            </td>)}

                            <td>{page.meta_description}</td>
                            <td>{page.source_url}</td>

                            <td onClick={() => confirm('are you sure?') ? deletePage(page.id) : null}>حدف</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}