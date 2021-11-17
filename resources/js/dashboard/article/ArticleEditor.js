import React from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import { Col, Container, Button, FormCheck, Form } from "react-bootstrap";
import { ApiCallHandler } from "../../commonFiles/helpers";
import { Routes, Api } from "../utility/URLs";
import PageContentEditor from "../components/PageContentEditor";

export default function ArticleEditor(props) {

    let { id } = useParams();
    const [article, setarticle] = React.useState(null)

    const [EditedPageContent, setEditedPageContent] = React.useState(null)

    const [categories, setcategories] = React.useState([]);
    const [category_id, setcategory_id] = React.useState(null);
    const [title, settitle] = React.useState();
    const [description, setdescription] = React.useState();
    const [thumbnail, setthumbnail] = React.useState();

    const [activated, setactivated] = React.useState(null);

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
            async () => await Api.editArticle(id, category_id, activated, EditedPageContent),
            (data) => { alert('article is updated'); setredirect(Routes.articlesIndex); },
            'ArticleEditor submit',
            true
        )
    }
    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return (
        <Col xs={12}>

            <FormCheck>
                <FormCheck.Label>عنوان المقالة</FormCheck.Label>
                <Form.Control defaultValue={article?.title} type='text' onChange={(e) => settitle(e.target.value)} />
            </FormCheck>
            <FormCheck>
                <FormCheck.Label>وصف المقالة</FormCheck.Label>
                <Form.Control defaultValue={article?.description} type='textarea' onChange={(e) => setdescription(e.target.value)} />
            </FormCheck>

            <Form.Select
                defaultValue={article?.category_id}
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
                defaultChecked={article.activated}
                onChange={(e) => {
                    setactivated(e.target.checked)
                }}
            />
            <img src={article.thumbnail} className='maxWidth100' />
            <ImagePicker setImage={(base64) => setthumbnail(base64)} />
            <PageContentEditor pageContent={article?.page_content} setEditedPageContent={setEditedPageContent} />


            <Button onClick={submit}>submit</Button>
        </Col>
    )
}