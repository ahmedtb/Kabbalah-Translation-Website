import React from "react";
import { Col, Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {Api} from "../utility/URLs";
import { ApiCallHandler } from "../utility/helpers";
import {Routes} from '../utility/URLs'

function SectionElements(props) {
    const sections = props.sections

    return <ListGroup as="ol" numbered>
        {
            sections.map((element, index) => <ListGroup.Item key={index} as="li">
                <Link to={Routes.pageShow(element.page_id)}>
                    {element.title}
                </Link>
            </ListGroup.Item>)
        }
    </ListGroup>
}

export default function BookShow(props) {
    const { id } = useParams()
    const [book, setbook] = React.useState(null)
    function setup() {
        ApiCallHandler(
            async () => await Api.fetchBook(id, {}),
            setbook,
            'BooksIndex setup',
            true
        )
    }

    React.useEffect(() => {
        setup()
    }, [])
    return <Container>
        <Col xs={12}>

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
                                    <SectionElements sections={element.sections} />
                                </ListGroup.Item>
                            return <ListGroup.Item key={index} as="li">
                                <Link to={Routes.pageShow(element.page_id)}>
                                    {element.title}
                                </Link>
                            </ListGroup.Item>
                        })
                    }
                </ListGroup>
            </Col>
        </Col>
    </Container>
}