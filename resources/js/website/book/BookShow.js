import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Col, ListGroup } from 'react-bootstrap'
import { Routes, Api, ApiCallHandler } from '../utility/Urls'
import {
    getsectionsarray,
    getsectionIndex
} from './Table'

export default function BookShow(props) {
    const { id } = useParams()
    const [book, setbook] = React.useState()
    function setup() {
        ApiCallHandler(
            async () => await Api.fetchBook(id),
            setbook,
            'BookShow',
            false
        )
    }
    React.useEffect(() => { setup() }, [])
    return <Col xs={12}>

        <h1 className='text-center'>{book?.title}</h1>
        <div>{book?.description}</div>
        <div>{book?.activated ? 'عرض الكتاب مفعل' : 'عرض الكتاب غير مفعل'}</div>
        <h3 className='text-center'>جدول المحتوى</h3>

        <Col xs={8} className='mx-auto'>

            <ListGroup as="ol" numbered>
                {
                    book?.table.map((element, index) => {
                        if (element.type == 'chapter')
                            return <ListGroup.Item key={index} as="li">
                                <Link to={Routes.bookChapterShow(id, index)}>
                                    {element.title}
                                </Link>
                                <ListGroup as="ol" numbered>
                                    {
                                        element.sections.map((element, sectionIndex) => <ListGroup.Item key={sectionIndex} as="li">
                                            <Link to={Routes.bookBrowser(id, getsectionIndex(book.table, index, sectionIndex))}>
                                                {element.title}
                                            </Link>
                                        </ListGroup.Item>)
                                    }
                                </ListGroup>
                            </ListGroup.Item>
                        return <ListGroup.Item key={index} as="li">
                            <Link to={Routes.bookBrowser(id, getsectionIndex(book.table, index))}>
                                {element.title}
                            </Link>
                        </ListGroup.Item>
                    })
                }
            </ListGroup>
        </Col>
    </Col>
}