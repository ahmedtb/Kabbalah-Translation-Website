import React from "react";
import { Container, Col, Table } from "react-bootstrap";
import {Api} from "../utility/URLs";
import {Routes} from "../utility/URLs";
import { ApiCallHandler } from "../utility/helpers";
import { Link } from "react-router-dom";
export default function BooksIndex(props) {
    const [books, setbooks] = React.useState([])
    function setup() {
        ApiCallHandler(
            async () => await Api.fetchBooks(),
            setbooks,
            'BooksIndex setup',
            true
        )
    }

    React.useEffect(() => {
        setup()
    }, [])

    return <Container >
        <Col xs={12}>
            <Table striped bordered hover>
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
                                {/* <td onClick={() => deleteBook(book.id)}>حدف</td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Col>
    </Container >
}