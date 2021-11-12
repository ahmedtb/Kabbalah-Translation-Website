import React from "react";
import {Api} from "../utility/URLs";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import PageContentEditor from "../components/PageContentEditor";
import { Col, Container, Button, FormCheck, Form } from "react-bootstrap";
import { logError, ApiCallHandler } from "../../commonFiles/helpers";
import PageContentRender from "../components/PageContentRender";
import {Routes} from "../utility/URLs";

export default function PageEditor(props) {

    let { id } = useParams();
    const [page, setpage] = React.useState(null)
    const [EditedPageContent, setEditedPageContent] = React.useState(null)
    const [title, settitle] = React.useState('');
    const [description, setdescription] = React.useState('');

    async function setup() {
        ApiCallHandler(
            async () => await Api.fetchPage(id),
            (data) => { setpage(data); settitle(data.title) },
            'PageEditor fetchPage',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])
    React.useEffect(() => {
        // console.log('PageEditor', EditedPageContent)
    }, [EditedPageContent])

    async function submit() {
        ApiCallHandler(
            async () => await Api.editPage(id, title, description, EditedPageContent, true),
            (data) => { alert('page is updated'); setredirect(Routes.pagesIndex); },
            'PageEditor submit',
            true
        )
    }
    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return (
        <Container >

            <FormCheck>
                <FormCheck.Label>عنوان المقالة</FormCheck.Label>
                <Form.Control type='text' onChange={(e) => settitle(e.target.value)} value={title} />
            </FormCheck>

            <FormCheck>
                <FormCheck.Label>وصف المقالة</FormCheck.Label>
                <Form.Control type='textarea' onChange={(e) => setdescription(e.target.value)} />
            </FormCheck>
            <Col xs={12}>
                <PageContentEditor pageContent={page?.page_content} setEditedPageContent={setEditedPageContent} />
                {/* <PageContentRender pageContent={page?.page_content} /> */}

                <Button onClick={submit}>submit</Button>
            </Col>
        </Container>
    )
}