
import React from 'react'
import { ApiCallHandler } from '../../commonFiles/helpers'
import { Api, Routes } from '../utility/URLs'
import { Dropdown, Form, Col, Button, Container, Row, FormControl } from 'react-bootstrap'
import ImagePicker from '../components/ImagePicker'
import { Redirect } from 'react-router'
import ContentTableEditor from './components/ContentTableEditor'




export default function BookCreator(props) {
    const [pages, setpages] = React.useState([])
    const [content_table, setcontent_table] = React.useState([])

    const [title, settitle] = React.useState('')
    const [description, setdescription] = React.useState('')
    const [author, setauthor] = React.useState('')
    const [activated, setactivated] = React.useState(false)

    const [thumbnail, setthumbnail] = React.useState('')

    const [redirect, setredirect] = React.useState()

    function setup() {

        ApiCallHandler(
            async () => await Api.fetchPages({
                // withoutContent: true, 
                withoutPagination: true
            }),
            setpages,
            'BookCreator fetchPages',
            false
        )
    }
    function submit() {
        ApiCallHandler(
            async () => await Api.createBook(title, description, thumbnail, author, activated, content_table),
            (data) => { alert(data.success); setredirect(Routes.booksIndex()) },
            'BookCreator2 submit',
            true
        )
    }

    React.useEffect(() => {
        setup()
    }, [])

    React.useEffect(() => {
        console.log('BookCreator content_table', content_table)
    }, [content_table])

    if (redirect)
        <Redirect to={redirect} />

    return <div>
        <Col xs={12} >
            <Row>
                <Form.Control as='input' type='text' placeholder='عنوان الكتاب' onChange={e => settitle(e.target.value)} />
            </Row>
            <Row>
                <Form.Control as='textarea' type='text' placeholder='وصف الكتاب' onChange={e => setdescription(e.target.value)} />
            </Row>
            <Row>
                <Form.Control as='input' type='text' placeholder='مؤلف الكتاب' onChange={e => setauthor(e.target.value)} />
            </Row>
            <Form.Check checked={activated} type='checkbox' label='تفعيل العرض' onChange={e => setactivated(e.target.value == 'on')} />

            <h5>صورة الغلاف</h5>
            <ImagePicker setImage={base64 => setthumbnail(base64)} />

        </Col>
        <Col xs={10} className='mx-auto'>
            <h3 className='text-center'>جدول المحتوى</h3>
            <ContentTableEditor pages={pages} editContentTable={setcontent_table} />
        </Col>

        <Button className='my-2' onClick={submit} variant="secondary" >
            انشاء الكتاب
        </Button>
    </div>
}