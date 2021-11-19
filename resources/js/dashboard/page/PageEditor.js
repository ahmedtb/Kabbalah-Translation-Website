import React from "react";
import { Api } from "../utility/URLs";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import PageContentEditor from "../components/PageContentEditor";
import { Col, Container, Button, FormCheck, Form } from "react-bootstrap";
import { logError, ApiCallHandler } from "../../commonFiles/helpers";
import { Routes } from "../utility/URLs";

export default function PageEditor(props) {

    let { id } = useParams();
    // const [page, setpage] = React.useState(null)
    const [EditedPageContent, setEditedPageContent] = React.useState(null)
    const [title, settitle] = React.useState('');
    const [meta_description, setmeta_description] = React.useState('');
    const [source_url, setsource_url] = React.useState('');

    async function setup() {
        ApiCallHandler(
            async () => await Api.fetchPage(id),
            (data) => { 
                // setpage(data); 
                settitle(data.title) 
                setmeta_description(data.meta_description)
                setsource_url(data.source_url)
                setEditedPageContent(data.page_content)
            },
            'PageEditor fetchPage',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])
    React.useEffect(() => {
        console.log('PageEditor', EditedPageContent)
    }, [EditedPageContent])

    async function submit() {
        ApiCallHandler(
            async () => await Api.editPage(id, title, meta_description, source_url, EditedPageContent),
            (data) => { alert(data.success); setredirect(Routes.pagesIndex); },
            'PageEditor submit',
            true
        )
    }
    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return (
        <div className='mb-5'>

            <FormCheck>
                <FormCheck.Label>عنوان الصفحة</FormCheck.Label>
                <Form.Control type='text' onChange={(e) => settitle(e.target.value)} value={title??''} />
            </FormCheck>

            <FormCheck>
                <FormCheck.Label>معلومات وصفية</FormCheck.Label>
                <Form.Control type='textarea' onChange={(e) => setmeta_description(e.target.value)} value={meta_description??''} />
            </FormCheck>

            <FormCheck>
                <FormCheck.Label>رابط المصدر</FormCheck.Label>
                <Form.Control as='input' onChange={(e) => setsource_url(e.target.value)} defaultValue={source_url??''} />
            </FormCheck>
            <Col xs={12}>
                <PageContentEditor pageContent={EditedPageContent} setEditedPageContent={setEditedPageContent} />

                <Button onClick={submit}>submit</Button>
            </Col>
        </div>
    )
}