import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { ApiCallHandler, Api, Routes } from '../utility/Urls'
import { Link } from 'react-router-dom'
import { truncate } from '../utility/helpers'

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

    return <Col>
        {
            books?.map((book, index) => (
                <Row key={index}>
                    <Col xs={2}>
                        <img src={book.thumbnail} style={{ maxWidth: '100%' }} />
                    </Col>
                    <Col xs={10}>
                        <Link to={Routes.bookShow(book.id)}>
                            {book.title}
                        </Link>
                        <div>{truncate(book.description)}</div>
                    </Col>
                </Row>
            ))
        }
        {/* <Table striped bordered hover>
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
        </Table> */}
    </Col>
}