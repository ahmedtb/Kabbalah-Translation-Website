import React from "react";
import { Container, Col, Table } from "react-bootstrap";
import { Api, Routes, ApiCallHandler } from "../utility/URLs";
import { Link } from "react-router-dom";
import Pagination from '../../commonFiles/Pagination'
import { TextFilter } from '../components/Filters'
import { truncate } from "../../commonFiles/helpers";
import { useHistory } from "react-router-dom"

export default function BooksIndex(props) {
    const history = useHistory()

    const [books, setbooks] = React.useState([])
    const [links, setlinks] = React.useState([])

    function fetchBooks(link = null, params = null) {
        let linkParams = Object.fromEntries(new URLSearchParams(link?.split('?')[1]))
        let allParams = { page_size: 10, ...linkParams, ...params }
        ApiCallHandler(
            async () => (
                await Api.fetchBooks(allParams)
            ),
            (data) => {
                setbooks(data.data);
                setlinks(data.links ?? []);
            },
            'BooksIndex fetchBooks',
            true
        )
        console.log('all params', allParams)
        history.replace({
            pathname: window.location.pathname,
            search: (new URLSearchParams(allParams)).toString()
        })
    }

    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));

        fetchBooks(null, params)
    }, [])

    return <Col xs={12}>
        <TextFilter
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
                    <th>مفعّل</th>

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
                            <td>{truncate(book.description, 200)}</td>
                            <td>{book.activated ? 'مفعل' : 'غير مفعل'}</td>
                            {/* <td onClick={() => deleteBook(book.id)}>حدف</td> */}
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        <Pagination fetchPage={fetchBooks} links={links} />

    </Col>
}