import React from "react";
import { Container, Col, Table } from "react-bootstrap";
import { Api, Routes, ApiCallHandler } from "../utility/URLs";
import { Link } from "react-router-dom";
import Pagination from '../../commonFiles/Pagination'
import { TextFilter } from '../components/Filters'

export default function BooksIndex(props) {
    const [books, setbooks] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    function fetchBooks(link = null, params = null) {
        ApiCallHandler(
            async () => (link ?
                await axios.get(link, { params: params }) :
                await Api.fetchBooks(params)
            ),
            (data) => { setbooks(data.data); setlinks(data.links ?? []); setparams(params) },
            'BooksIndex fetchBooks',
            true
        )
    }

    React.useEffect(() => {
        fetchBooks()
    }, [])

    return  <Col xs={12}>
        <TextFilter
            params={params}
            fetchPage={(newparams) => fetchBooks(null, newparams)}
            property={'title'}
            label={'عنوان الكتاب'}
        />
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
        <Pagination fetchPage={fetchBooks} links={links} />

    </Col>
}