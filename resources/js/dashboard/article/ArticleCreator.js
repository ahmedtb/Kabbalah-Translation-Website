import React from "react"
import { Redirect } from "react-router";
import { Container, Button, Form, FormCheck } from "react-bootstrap";
import { Api, Routes, ApiCallHandler } from "../utility/URLs";
import ImagePicker from '../components/ImagePicker'
import PageContentEditor from "../components/PageContentEditor";

export default function ArticleCreator(props) {
    const [categories, setcategories] = React.useState([]);

    // const [page_id, setpage_id] = React.useState(null);
    const [category_id, setcategory_id] = React.useState(null);

    const [title, settitle] = React.useState();
    const [description, setdescription] = React.useState();
    const [thumbnail, setthumbnail] = React.useState();

    const [activated, setactivated] = React.useState(false);
    const [page_content, setpage_content] = React.useState(null)

    const [source_url, setsource_url] = React.useState('')

    function submit() {
        ApiCallHandler(
            async () => await Api.createArticle(category_id, title, description, thumbnail, activated, page_content, source_url),
            (data) => {
                alert(data.success)
                setredirect(Routes.articlesIndex())
            },
            'ArticleCreator submit',
            true
        )

    }

    React.useEffect(() => {
        ApiCallHandler(
            async () => await Api.fetchCategories({ withoutPagination: true }),
            setcategories,
            'ArticleCreator fetchCategories',
            true
        )
    }, [])

    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return <div >
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
        <img src={thumbnail} width={100} />

        <ImagePicker setImage={(base64) => setthumbnail(base64)} />

        <FormCheck>
            <FormCheck.Label>رابط المصدر</FormCheck.Label>
            <Form.Control type='text' value={source_url} onChange={(e) => setsource_url(e.target.value)} />
        </FormCheck>

        <PageContentEditor setEditedPageContent={setpage_content} />

        <Button onClick={submit}>submit</Button>

    </div >
}