import React from "react"
import { Redirect } from "react-router";
import { Container, Button, Form, FormCheck } from "react-bootstrap";
import { Api, Routes, ApiCallHandler } from "../utility/URLs";
import ImagePicker from '../components/ImagePicker'

export default function ArticleCreator(props) {
    const [pages, setpages] = React.useState([]);
    const [categories, setcategories] = React.useState([]);

    const [page_id, setpage_id] = React.useState(null);
    const [category_id, setcategory_id] = React.useState(null);

    const [title, settitle] = React.useState();
    const [description, setdescription] = React.useState();
    const [thumbnail, setthumbnail] = React.useState();

    const [activated, setactivated] = React.useState(null);

    function submit() {
        ApiCallHandler(
            async () => await Api.createArticle(page_id, category_id, title, description, thumbnail, activated),
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
        <FormCheck>
            <FormCheck.Label>عنوان المقالة</FormCheck.Label>
            <Form.Control type='text' onChange={(e) => settitle(e.target.value)} />
        </FormCheck>
        <FormCheck>
            <FormCheck.Label>وصف المقالة</FormCheck.Label>
            <Form.Control type='textarea' onChange={(e) => setdescription(e.target.value)} />
        </FormCheck>
        <Form.Select
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
            defaultChecked={activated}
            onChange={(e) => {
                setactivated(e.target.checked)
            }}
        />
        <ImagePicker setImage={(base64) => setthumbnail(base64)} />
        <Button onClick={submit}>submit</Button>

    </Container >
}