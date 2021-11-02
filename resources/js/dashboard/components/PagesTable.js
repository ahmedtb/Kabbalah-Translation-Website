import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Routes from '../utility/Routes'
export default function PagesTable(props) {
    const pages = props.pages
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>page content</th>
                    <th>activated</th>
                </tr>
            </thead>
            <tbody>
                {
                    pages?.map((page, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={Routes.pageShow.replace(':id', page.id)}>
                                    {page.id}
                                </Link>
                            </td>
                            <td>{'page.page_content'}</td>
                            <td>{page.activated}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}