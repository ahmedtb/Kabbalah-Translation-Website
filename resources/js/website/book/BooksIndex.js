import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { ApiCallHandler, Api, Routes } from '../utility/Urls'
import { Link } from 'react-router-dom'
import { truncate } from '../../commonFiles/helpers'
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from '../../commonFiles/LoadingIndicator';

export default function BooksIndex(props) {
    const [books, setbooks] = React.useState()
    function setup() {
        trackPromise(
            ApiCallHandler(
                async () => await Api.fetchBooks(),
                setbooks,
                'BooksIndex',
                true
            )
        )
    }
    React.useEffect(() => { setup() }, [])

    return <Col>
        <LoadingIndicator />

        {
            books?.map((book, index) => (
                <Row key={index} className='m-3 p-1 border rounded'>
                    <Col xs={2}>
                        <img src={book?.hasThumbnail ? Api.bookThumbnail(book.id) : ''} style={{ maxWidth: '100%' }} />
                    </Col>
                    <Col xs={10}>
                        <Link to={Routes.bookShow(book.id)}>
                            <h5>{book.title}</h5>
                        </Link>
                        <div>{truncate(book.description, 400)}</div>
                    </Col>
                </Row>
            ))
        }
    </Col>
}