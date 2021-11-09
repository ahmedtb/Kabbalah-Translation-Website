import React from "react";
import { Col, Container } from "react-bootstrap";
import { useParams } from "react-router";
import ApiEndpoints from "../utility/ApiEndpoints";
import { ApiCallHandler } from "../utility/helpers";

export default function BookShow(props) {
    const { id } = useParams()
    const [book, setbook] = React.useState(null)
    function setup() {
        ApiCallHandler(
            async () => await ApiEndpoints.fetchBook(id, { with: ['sections', 'bookChapters.sections'] }),
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
            <div>{book?.activated}</div>
            {
                book?.sections.map((section, index) => <div key={index}>
                    <div>{section.title}</div>
                    <div>{section.id}</div>
                </div>)
            }
            {
                book?.book_chapters.map((chapter, index) => <div key={index}>
                    <div>{chapter.title}</div>
                    {
                        chapter?.sections.map((section, index) => <div key={index}>
                            <div>{section.title}</div>
                            <div>{section.id}</div>
                        </div>)
                    }
                </div>)
            }
        </Col>
    </Container>
}