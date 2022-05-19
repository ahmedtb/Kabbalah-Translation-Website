import React from "react";
import { Api } from "../utility/URLs";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import PageContentEditor from "../components/PageContentEditor";
import { Col, Container, Button, FormCheck, Form } from "react-bootstrap";
import { logError, ApiCallHandler } from "../../commonFiles/helpers";
import { Routes } from "../utility/URLs";
import ChangePageTitle from "../../commonFiles/ChangePageTitle";

export default function PageEditor(props) {

    let { id } = useParams();
    // const [page, setpage] = React.useState(null)
    const [EditedPageContent, setEditedPageContent] = React.useState(null)
    const [title, settitle] = React.useState('');
    const [about, setabout] = React.useState('');
    const [description, setdescription] = React.useState('');

    const [source_url, setsource_url] = React.useState('');
    const [book_id, setbook_id] = React.useState('');
    const [books, setbooks] = React.useState([]);

    async function setup() {
        ApiCallHandler(
            async () => await Api.fetchPage(id),
            (data) => {
                // setpage(data); 
                settitle(data.title)
                setabout(data.about)
                setdescription(data.description)
                setsource_url(data.source_url)
                setEditedPageContent(data.page_content)
                setbook_id(data.book_id)
            },
            'PageEditor fetchPage',
            true
        )
        ApiCallHandler(
            async () => await Api.fetchBooks({ withoutPagination: true }),
            setbooks,
            'PageCreator fetchBooks',
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
            async () => await Api.editPage(id, title, about, source_url, EditedPageContent, book_id),
            (data) => { alert(data.success); setredirect(Routes.pageShow(id)); },
            'PageEditor submit',
            true
        )
    }
    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return (<div>
        <div className="bg-white p-2">
            <ChangePageTitle pageTitle={title} />

            <FormCheck className="my-2">
                <FormCheck.Label className="fs-5">عنوان الصفحة</FormCheck.Label>
                <Form.Control type='text' onChange={(e) => settitle(e.target.value)} value={title ?? ''} />
            </FormCheck>
            <Form.Select
                aria-label="Default select example"
                onChange={e => {
                    setbook_id(e.target.value)
                }}
                value={book_id ?? ''}
            >
                <option>اختر كتاب</option>
                {
                    books.map((book, bookIndex) => <option key={bookIndex} value={book.id}>{book.title}</option>)
                }
            </Form.Select>

            <FormCheck className="my-2">
                <FormCheck.Label className="fs-5">حول الصفحة {'(لايظهر للمتصفحين)'}</FormCheck.Label>
                <Form.Control as='textarea' onChange={(e) => setabout(e.target.value)} value={about ?? ''} />
            </FormCheck>

            <FormCheck className="my-2">
                <FormCheck.Label className="fs-5">وصف للصفحة</FormCheck.Label>
                <Form.Control as='textarea' onChange={(e) => setdescription(e.target.value)} value={description ?? ''} />
            </FormCheck>

            <FormCheck className="my-2">
                <FormCheck.Label className="fs-5">رابط المصدر</FormCheck.Label>
                <Form.Control as='input' onChange={(e) => setsource_url(e.target.value)} defaultValue={source_url ?? ''} />
            </FormCheck>
        </div>

        <div>
            <PageContentEditor pageContent={EditedPageContent} setEditedPageContent={setEditedPageContent} />

            <Button onClick={submit}>submit</Button>
        </div>
    </div>
    )
}