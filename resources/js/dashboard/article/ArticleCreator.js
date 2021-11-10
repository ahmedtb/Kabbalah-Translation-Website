import React from "react"
import { Redirect } from "react-router";
import { Container, Button, Form } from "react-bootstrap";
import { Api, Routes, ApiCallHandler } from "../utility/URLs";

export default function ArticleCreator(props) {
    const [pages, setpages] = React.useState([]);
    const [categories, setcategories] = React.useState([]);

    const [page_id, setpage_id] = React.useState(null);
    const [category_id, setcategory_id] = React.useState(null);
    const [activated, setactivated] = React.useState(null);

    function submit() {

        ApiCallHandler(
            async () => await Api.createArticle(page_id, category_id, activated),
            (data) => {
                alert(data)
                setredirect(Routes.dashboard)
            },
            'ArticleCreator submit',
            true
        )

    }

    React.useEffect(() => {
        ApiCallHandler(
            async () => await Api.fetchPages(),
            setpages,
            'ArticleCreator fetchPages',
            true
        )
        ApiCallHandler(
            async () => await Api.fetchCategories(),
            setcategories,
            'ArticleCreator fetchCategories',
            true
        )
    }, [])

    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return <Container >

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

    </Container >
}