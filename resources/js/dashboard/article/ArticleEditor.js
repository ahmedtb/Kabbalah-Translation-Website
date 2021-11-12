import React from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import { Col, Container, Button, FormCheck, Form } from "react-bootstrap";
import { ApiCallHandler } from "../../commonFiles/helpers";
import { Routes, Api } from "../utility/URLs";

export default function ArticleEditor(props) {

    let { id } = useParams();
    const [article, setarticle] = React.useState(null)
    const [pages, setpages] = React.useState([]);
    const [categories, setcategories] = React.useState([]);

    const [page_id, setpage_id] = React.useState();
    const [category_id, setcategory_id] = React.useState();
    const [activated, setactivated] = React.useState();

    async function setup() {
        ApiCallHandler(
            async () => await Api.fetchArticle(id),
            (data) => { setarticle(data) },
            'ArticleEditor fetchArticle',
            true
        )
        ApiCallHandler(
            async () => await Api.fetchPages(),
            setpages,
            'ArticleEditor fetchPages',
            true
        )
        ApiCallHandler(
            async () => await Api.fetchCategories(),
            setcategories,
            'ArticleEditor fetchCategories',
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

            <div>{article?.page_id}</div>
                <div>{article?.category_id}</div>
                <div>{article?.id}</div>
                <Form.Select
                    aria-label="Default select example"
                    onChange={e => {
                        setpage_id(e.target.value)
                    }}
                >
                    <option>اختر صفحة</option>
                    {
                        pages.map((page, index) => <option key={index} value={page.id}>{page.title}</option>)
                    }
                </Form.Select>

                <Form.Select
                    aria-label="Default select example"
                    onChange={e => {
                        setcategory_id(e.target.value)
                    }}
                >
                    <option>اختر صفحة</option>
                    {
                        categories.map((category, index) => <option key={index} value={category.id}>{category.name}</option>)
                    }
                </Form.Select>
                <Form.Check
                    inline
                    label="activated"
                    type={'checkbox'}
                    checked={activated}
                    onChange={(e) => {
                        setactivated(e.target.checked)
                    }}
                />
                <Button onClick={submit}>submit</Button>
            </Col>
        </Container>
    )
}