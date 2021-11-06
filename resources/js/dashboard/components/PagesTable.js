import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Routes from '../utility/Routes'

export default function PagesTable(props) {
    const pages = props.pages
    const deletePage = props.deletePage
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>العنوان</th>
                    <th>محتوى الصفحة</th>
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
                            <td>{'page.page_content'}</td>
                            <td>{page.activated == 1 ? 'نعم' : 'لا'}</td>
                            <td onClick={() => deletePage(page.id)}>حدف</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}