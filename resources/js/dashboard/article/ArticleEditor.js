import React from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import { Col, Container, Button, FormCheck, Form } from "react-bootstrap";
import { ApiCallHandler } from "../utility/helpers";
import {Routes, Api} from "../utility/URLs";

export default function ArticleEditor(props) {

    let { id } = useParams();
    const [article, setarticle] = React.useState(null)
    
    const [page_id, setpage_id] = React.useState(null);
    const [category_id, setcategory_id] = React.useState(null);
    const [activated, setactivated] = React.useState(null);

    async function setup() {
        ApiCallHandler(
            async () => await Api.fetchArticle(id),
            (data) => { setarticle(data) },
            'ArticleEditor fetchArticle',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])

    async function submit() {
        ApiCallHandler(
            async () => await Api.editArticle(id, page_id, category_id, activated),
            (data) => { alert('article is updated'); setredirect(Routes.articlesIndex); },
            'ArticleEditor submit',
            true
        )
    }
    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return (
        <Container >

            
            <Col xs={12}>
                <Button onClick={submit}>submit</Button>
            </Col>
        </Container>
    )
}