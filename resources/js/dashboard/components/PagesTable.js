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
    function hasBookSections(Obj, Or = null) {
        return pages[0]?.book_sections ? Obj : Or
    }

    function renderSection(section) {
        if (section.sectionable_type == 'App//Model/Book') {
            return <Link to={Routes.bookShow(section.sectionable_id)}>
                {section.title}
            </Link>
        } else {
            return <Link to={Routes.bookShow(section.sectionable.book_id)}>
                {section.title}
            </Link>
        }

    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>العنوان</th>
                    {hasArticles(<th>مقالات</th>)}
                    {hasBookSections(<th>عناوين كتب</th>)}

                    <th>مفعل؟</th>
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
                            {hasBookSections(<td>
                                {page.book_sections?.map((section, index) => renderSection(section))}
                            </td>)}

                            <td>{page.activated == 1 ? 'نعم' : 'لا'}</td>
                            <td onClick={() => confirm('are you sure?') ? deletePage(page.id) : null}>حدف</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}