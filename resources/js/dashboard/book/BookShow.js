import React from "react";
import { Col, Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Api } from "../utility/URLs";
import { ApiCallHandler } from "../../commonFiles/helpers";
import { Routes } from '../utility/URLs'

function Chapter(props) {
    const chapter = props.chapter

    return <ListGroup as="ol" numbered>
        <div>{chapter?.title}</div>
        {
            chapter?.sections?.map((element, index) => {
                if (element.type == 'section')
                    return <Section key={index} section={element} />

                else if (element.type == 'chapter')
                    return <Chapter key={index} chapter={element} />
            })
        }
    </ListGroup>
}
function Section(props) {
    const section = props.section

    return <ListGroup.Item as="li">
        <Link to={Routes.pageShow(section.page_id)}>
            {section.title}
        </Link>
    </ListGroup.Item>
}

export default function BookShow(props) {
    const { id } = useParams()
    const [book, setbook] = React.useState(null)
    function setup() {
        ApiCallHandler(
            async () => await Api.fetchBook(id, {}),
            setbook,
            'BookShow setup',
            true
        )
    }

    React.useEffect(() => {
        setup()
    }, [])
    return <Col xs={12}>
        <Link to={Routes.bookEdit(book?.id)}>
            edit
        </Link>
        <h1 className='text-center'>{book?.title}</h1>
        <div>{book?.description}</div>
        <div>{book?.activated ? 'عرض الكتاب مفعل' : 'عرض الكتاب غير مفعل'}</div>
        <h3 className='text-center'>جدول المحتوى</h3>

        <Col xs={8} className='mx-auto'>

            <ListGroup as="ol">
                {
                    book?.content_table.map((element, index) => {
                        if (element.type == 'chapter')
                            return <Chapter chapter={element} key={index} />
                        else
                            return <Section section={element} key={index} />

                    })
                }
            </ListGroup>
        </Col>
    </Col>
}