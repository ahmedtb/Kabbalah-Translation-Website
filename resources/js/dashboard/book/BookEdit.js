
import React from 'react'
import { ApiCallHandler } from '../../commonFiles/helpers'
import { Api, Routes } from '../utility/URLs'
import { Dropdown, Form, Col, Button, Container, Row, FormControl } from 'react-bootstrap'
import ContentTableEditor from './components/ContentTableEditor'
import ImagePicker from '../components/ImagePicker'
import { useParams } from "react-router";
import { Redirect } from 'react-router-dom'


export default function BookEdit(props) {
    const { id } = useParams()
    const [content_table, setcontent_table] = React.useState([])

    const [pages, setpages] = React.useState([])
    const [title, settitle] = React.useState('')
    const [description, setdescription] = React.useState('')
    const [author, setauthor] = React.useState('')
    const [activated, setactivated] = React.useState(false)

    const [thumbnail, setthumbnail] = React.useState('')

    function setup() {
        ApiCallHandler(
            async () => await Api.fetchBook(id, {}),
            (data) => {
                settitle(data.title)
                setdescription(data.description)
                setauthor(data.author)
                setactivated(data.activated)
                setthumbnail(data.thumbnail)
                setcontent_table( data.content_table )
            },
            'BookEdit fetchBook',
            true
        )
        ApiCallHandler(
            async () => await Api.fetchPages({
                // withoutContent: true, 
                withoutPagination: true
            }),
            setpages,
            'BookEdit fetchPages',
            false
        )
    }
    const [redirect, setredirect] = React.useState()

    function submit() {
        ApiCallHandler(
            async () => await Api.editBook(id, title, description, thumbnail, author, activated, content_table),
            (data) => { alert(data.success); setredirect(Routes.booksIndex()) },
            'BookEdit submit',
            true
        )
    }

    React.useEffect(() => {
        setup()
    }, [])

    React.useEffect(() => {
        console.log('BookEdit content_table', content_table)
    }, [content_table])

    if (redirect)
        return <Redirect to={redirect} />

    return <div>
        <Col xs={12} >
            <Row>
                <Form.Control defaultValue={title} as='input' type='text' placeholder='عنوان الكتاب' onChange={e => settitle(e.target.value)} />
            </Row>
            <Row>
                <Form.Control defaultValue={description} as='textarea' type='text' placeholder='وصف الكتاب' onChange={e => setdescription(e.target.value)} />
            </Row>
            <Row>
                <Form.Control defaultValue={author} as='input' type='text' placeholder='مؤلف الكتاب' onChange={e => setauthor(e.target.value)} />
            </Row>
            <Form.Check checked={activated} type='checkbox' label='تفعيل العرض' onChange={e => setactivated(e.target.checked)} />
            <h5>صورة الغلاف</h5>
            <img src={thumbnail} className='maxWidth100' />
            <ImagePicker setImage={base64 => setthumbnail(base64)} />

        </Col>
        <Col xs={10} className='mx-auto'>
            <h3 className='text-center'>جدول المحتوى</h3>
            <ContentTableEditor pages={pages} content_table={content_table} editContentTable={setcontent_table} />
        </Col>

        <Button className='my-2' onClick={submit} variant="secondary" >
            تعديل الكتاب
        </Button>
    </div>
}