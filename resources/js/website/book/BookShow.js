import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Col, ListGroup } from 'react-bootstrap'
import { Routes, Api, ApiCallHandler } from '../utility/Urls'


export default function BookShow(props) {
    const { id } = useParams()
    const [book, setbook] = React.useState()
    function setup() {
        ApiCallHandler(
            async () => await Api.fetchBook(id),
            setbook,
            'BookShow',
            true
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
                    book?.content_table.map((element, index) => {
                        if (element.sections)
                            return <ListGroup.Item key={index} as="li">
                                {element.title}
                                <ListGroup as="ol" numbered>
                                    {
                                        element.sections.map((section, subIndex) => <ListGroup.Item key={subIndex} as="li">
                                            <Link to={Routes.bookBrowser(id, section.id)}
                                                to={{
                                                    pathname: Routes.bookBrowser(id, section.id),
                                                    state: { book: book }
                                                }}
                                            >
                                                {section.title}
                                            </Link>
                                        </ListGroup.Item>)
                                    }
                                </ListGroup>
                            </ListGroup.Item>
                        else
                            return <ListGroup.Item key={index} as="li">
                                <Link to={Routes.bookBrowser(id, element.id)}
                                    to={{
                                        pathname: Routes.bookBrowser(id, element.id),
                                        state: book
                                    }}
                                >
                                    {element.title}
                                </Link>
                            </ListGroup.Item>
                    })
                }
            </ListGroup>
        </Col>
    </Col>
}