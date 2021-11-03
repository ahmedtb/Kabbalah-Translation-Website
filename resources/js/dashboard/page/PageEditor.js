import React from "react";
import ApiEndpoints from "../utility/ApiEndpoints";
import { useParams } from "react-router";
import PageContentEditor from "../PageComponents/PageContentEditor";
import { Col, Container, Button } from "react-bootstrap";
import logError from "../utility/logError";

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
        // console.log('PageEditor', EditedPageContent)
    }, [EditedPageContent])

    async function submit() {
        try {
            console.log('PageEditor submit', EditedPageContent)
            const response = await ApiEndpoints.editPage(id, EditedPageContent, true)
            console.log('PageEditor submit', response.data)
        } catch (error) {
            logError(error, 'PageEditor submit')
        }
    }

    return (
        <Container >
            <Col xs={12}>
                <PageContentEditor pageContent={page?.page_content} setEditedPageContent={setEditedPageContent} />
                <Button onClick={submit}>submit</Button>
            </Col>
        </Container>
    )
}