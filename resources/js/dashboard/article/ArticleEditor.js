import React from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import { Col, Container, Button, FormCheck, Form } from "react-bootstrap";
import { ApiCallHandler } from "../../commonFiles/helpers";
import { Routes, Api } from "../utility/URLs";
import PageContentEditor from "../components/PageContentEditor";
import ImagePicker from '../components/ImagePicker'
export default function ArticleEditor(props) {

    let { id } = useParams();

    const [EditedPageContent, setEditedPageContent] = React.useState(null)
    const [article, setarticle] = React.useState('')

    const [categories, setcategories] = React.useState([]);
    const [category_id, setcategory_id] = React.useState('');
    const [title, settitle] = React.useState('');
    const [description, setdescription] = React.useState('');
    const [about, setabout] = React.useState('');

    const [thumbnail, setthumbnail] = React.useState('');

    const [activated, setactivated] = React.useState(false);
    const [source_url, setsource_url] = React.useState('')

    async function setup() {
        ApiCallHandler(
            async () => await Api.fetchArticle(id),
            (data) => {
                setEditedPageContent(data.page_content)
                setcategory_id(data.category_id)
                settitle(data.title)
                setdescription(data.description)
                setabout(data.about)
                setthumbnail(data.thumbnail)
                setactivated(data.activated)
                setsource_url(data.source_url)
                setarticle(data)
            },
            'ArticleEditor fetchArticle',
            true
        )
        ApiCallHandler(
            async () => await Api.fetchCategories({ withoutPagination: true }),
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
            async () => await Api.editArticle(id, category_id, title, description, thumbnail, activated, EditedPageContent, source_url),
            (data) => { alert(data.success); setredirect(Routes.articlesIndex); },
            'ArticleEditor submit',
            true
        )
    }
    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return (
        <div>
            <div className="bg-white p-2">

                <FormCheck className="my-2">
                    <FormCheck.Label>عنوان المقالة</FormCheck.Label>
                    <Form.Control defaultValue={title ?? ''} type='text' onChange={(e) => settitle(e.target.value)} />
                </FormCheck>
                <FormCheck className="my-2">
                    <FormCheck.Label>وصف المقالة</FormCheck.Label>
                    <Form.Control defaultValue={description ?? ''} as='textarea' onChange={(e) => setdescription(e.target.value)} />
                </FormCheck>

                <FormCheck className="my-2">
                    <FormCheck.Label>حول المقالة</FormCheck.Label>
                    <Form.Control defaultValue={about ?? ''} as='textarea' onChange={(e) => setabout(e.target.value)} />
                </FormCheck>

                <Form.Select
                    value={category_id}
                    onChange={e => {
                        setcategory_id(e.target.value)
                    }}
                     className="my-2"
                >
                    <option>اختر صفحة</option>
                    {
                        categories?.map((category, index) => <option key={index} value={category.id}>{category.name}</option>)
                    }
                </Form.Select>
                <Form.Check
                    inline
                    label="activated"
                    type={'checkbox'}
                    checked={activated ?? false}
                    onChange={(e) => {
                        setactivated(e.target.checked)
                    }}
                     className="my-2"
                />
                <img src={thumbnail ?? article?.hasThumbnail ? Api.articleThumbnail(id) : ''} className='maxWidth100' />
                <ImagePicker setImage={(base64) => setthumbnail(base64)} />
                <FormCheck className="my-2">
                    <FormCheck.Label>رابط المصدر</FormCheck.Label>
                    <Form.Control type='text' value={source_url} onChange={(e) => setsource_url(e.target.value)} />
                </FormCheck>
            </div>

            <PageContentEditor pageContent={EditedPageContent} setEditedPageContent={setEditedPageContent} />


            <Button onClick={submit}>submit</Button>
        </div>
    )
}