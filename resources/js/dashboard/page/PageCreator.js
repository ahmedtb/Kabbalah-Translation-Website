import React from "react"
import { Redirect } from "react-router";
import { Button, Col, FormCheck, Form } from "react-bootstrap";
import { Api } from "../utility/URLs";
import { Routes } from "../utility/URLs";
import { ApiCallHandler } from "../../commonFiles/helpers";
import PageContentEditor from "../components/PageContentEditor";
import ChangePageTitle from "../../commonFiles/ChangePageTitle";

export default function PageCreator(props) {
    const [page_content, setpage_content] = React.useState(null)
    const [title, settitle] = React.useState('');
    const [about, setabout] = React.useState('');
    const [source_url, setsource_url] = React.useState('');
    const [book_id, setbook_id] = React.useState('');

    React.useEffect(() => {
        console.log('PageCreator page_content', page_content)
    }, [page_content])

    function submit() {

        ApiCallHandler(
            async () => await Api.createPage(title, about, source_url, page_content, book_id),
            (data) => {
                alert(data.success)
                setredirect(Routes.pagesIndex())
            },
            'PageCreator submit',
            true
        )

    }
    const [books, setbooks] = React.useState([]);

    function setup() {

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


    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return <div className='mb-6'>
        <ChangePageTitle pageTitle={'انشاء صفحة'} />

        <FormCheck>
            <FormCheck.Label>عنوان الصفحة</FormCheck.Label>
            <Form.Control as='input' onChange={(e) => settitle(e.target.value)} />
        </FormCheck>
        <Form.Select
            aria-label="Default select example"
            onChange={e => {
                setbook_id(e.target.value)
            }}
            value={book_id}
        >
            <option>اختر كتاب</option>
            {
                books.map((book, bookIndex) => <option key={bookIndex} value={book.id}>{book.title}</option>)
            }
        </Form.Select>
        <FormCheck>
            <FormCheck.Label>وصف المحتوى</FormCheck.Label>
            <Form.Control as='textarea' onChange={(e) => setabout(e.target.value)} rows={3} />
        </FormCheck>
        <FormCheck>
            <FormCheck.Label>رابط المصدر</FormCheck.Label>
            <Form.Control as='input' onChange={(e) => setsource_url(e.target.value)} />
        </FormCheck>

        <Col xs={12}>
            <PageContentEditor setEditedPageContent={setpage_content} />

            <Button onClick={submit}>submit</Button>

        </Col>

    </div >
}
