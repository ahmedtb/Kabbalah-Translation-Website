import React from "react";
import ApiEndpoints from "../utility/ApiEndpoints";
import { useParams } from "react-router";
import PageContentEditor from "../PageComponents/PageContentEditor";
import { Col, Container } from "react-bootstrap";

export default function PageEditor(props) {

    let { id } = useParams();
    const [page, setpage] = React.useState(null)
    const [EditedPageContent, setEditedPageContent] = React.useState(null)

    async function setup() {
        ApiEndpoints.fetchPage(id, (data) => { setpage(data); setEditedPageContent(data.page_content); })
    }
    React.useEffect(() => {
        setup()
    }, [])
    React.useEffect(() => {
        console.log('PageEditor', EditedPageContent)
    }, [EditedPageContent])
    return (
        <Container >
            <Col xs={12}>
                <PageContentEditor pageContent={page?.page_content} setEditedPageContent={setEditedPageContent} />
            </Col>
        </Container>
    )
}