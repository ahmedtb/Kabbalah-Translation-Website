import React from "react"
import { Redirect } from "react-router";
import {  Button, Col, FormCheck, Form } from "react-bootstrap";
import { Api } from "../utility/URLs";
import { Routes } from "../utility/URLs";
import { ApiCallHandler } from "../../commonFiles/helpers";
import PageContentEditor from "../components/PageContentEditor";

export default function PageCreator(props) {
    const [page_content, setpage_content] = React.useState(null)
    const [title, settitle] = React.useState('');
    const [meta_description, setmeta_description] = React.useState('');
    const [source_url, setsource_url] = React.useState('');

    React.useEffect(() => {
        console.log('PageCreator page_content', page_content)
    }, [page_content])

    function submit() {

        ApiCallHandler(
            async () => await Api.createPage(title, meta_description, source_url, page_content, true),
            (data) => {
                alert(data.success)
                setredirect(Routes.pagesIndex())
            },
            'PageCreator submit',
            true
        )

    }
    

    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return <div className='mb-6'>
      
        <FormCheck>
            <FormCheck.Label>عنوان الصفحة</FormCheck.Label>
            <Form.Control as='input' onChange={(e) => settitle(e.target.value)} />
        </FormCheck>
        <FormCheck>
            <FormCheck.Label>وصف المحتوى</FormCheck.Label>
            <Form.Control as='textarea' onChange={(e) => setmeta_description(e.target.value)} rows={3} />
        </FormCheck>
        <FormCheck>
            <FormCheck.Label>رابط المصدر</FormCheck.Label>
            <Form.Control as='input' onChange={(e) => setsource_url(e.target.value)} />
        </FormCheck>
        <Col xs={12}>
            <PageContentEditor setEditedPageContent ={setpage_content} />
        
            <Button onClick={submit}>submit</Button>
            
        </Col>

    </div >
}
