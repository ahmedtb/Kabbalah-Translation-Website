import React from 'react'
import { Table } from 'react-bootstrap'
import { ApiCallHandler, Api, Routes } from '../utility/Urls'

export default function BooksIndex(props) {
    const [books, setbooks] = React.useState([])
    function setup() {
        ApiCallHandler(
            async () => await Api.fetchBooks(),
            setbooks,
            'BooksIndex',
            true
        )
    }
    React.useEffect(() => { setup() }, [])

    return <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>العنوان</th>
                <th>وصف</th>

            </tr>
        </thead>
        <tbody>
            {
                books?.map((book, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={Routes.bookShow(book.id)}>
                                {book.id}
                            </Link>
                        </td>
                        <td>{book.title}</td>
                        <td>{book.description}</td>
                    </tr>
                ))
            }
        </tbody>
    </Table>
}