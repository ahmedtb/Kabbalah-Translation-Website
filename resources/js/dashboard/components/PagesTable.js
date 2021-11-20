import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { truncate } from '../../commonFiles/helpers'
import { HeaderComponentClass, ImageComponentClass, LinkComponentClass, ParagraphComponentClass, TitleComponentClass } from '../../commonFiles/PageComponents/structure'
import { Routes } from '../utility/URLs'


export default function PagesTable(props) {
    const pages = props.pages
    const deletePage = props.deletePage

    function hasArticles(Obj, Or = null) {
        return pages[0]?.articles ? Obj : Or
    }

    function hasBooks(Obj, Or = null) { return pages[0]?.books ? Obj : Or }
    function hasIsTrasnalted(Obj, Or = null) { return pages[0]?.isTranslated != undefined ? Obj : Or }

    return (
        <Table striped bordered hover responsive >
            <thead>
                <tr>
                    <th>#</th>
                    <th>العنوان</th>
                    {hasArticles(<th>مقالات</th>)}

                    <th>معلومات عن الصفحة</th>
                    <th>رابط المصدر</th>
                    {hasBooks(<th>كتب تستعمل الصفحة</th>)}
                    {hasIsTrasnalted(<th>مترحمة؟</th>)}

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

                            <td>{truncate(page.meta_description, 30)}</td>
                            <td>{truncate(page.source_url, 30)}</td>
                            {hasBooks(<td>
                                {page.books?.map((book, index) => (
                                    <Link key={index} to={Routes.bookShow(book.id)}>{book.title}</Link>
                                ))}
                            </td>)}
                            {hasIsTrasnalted(<td>
                                {page.isTranslated ? 'مترجمة' : 'غير مترجمة'}
                            </td>)}
                            <td onClick={() => confirm('are you sure?') ? deletePage(page.id) : null}>حدف</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}