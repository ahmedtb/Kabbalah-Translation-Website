
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
    const [about, setabout] = React.useState('')

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
            async () => await Api.createBook(title, description, about, thumbnail, author, activated, content_table),
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

    return <div className='bg-white'>
        <div xs={12} >

            <div className='my-2'>
                <div className='fw-bold'>عنوان الكتاب</div>
                <Form.Control as='input' type='text' placeholder='عنوان الكتاب' onChange={e => settitle(e.target.value)} />
            </div>
            <div className='my-2'>
                <div className='fw-bold'>وصف الكتاب</div>
                <Form.Control as='textarea' type='text' placeholder='وصف الكتاب' onChange={e => setdescription(e.target.value)} />
            </div>

            <div className='my-2'>
                <div className='fw-bold'>حول الكتاب</div>
                <Form.Control as='textarea' type='text' placeholder='حول الكتاب' onChange={e => setabout(e.target.value)} />
            </div>
            <div className='my-2'>
                <div className='fw-bold'>مؤلف الكتاب</div>
                <Form.Control as='input' type='text' placeholder='مؤلف الكتاب' onChange={e => setauthor(e.target.value)} />
            </div>
            <div className='my-2'>
                <div className='fw-bold'>
                    تفعيل العرض
                </div>
                <input checked={activated} type='checkbox' onChange={e => setactivated(e.target.checked)} />
            </div>
            <div className='my-2'>
                <h5>صورة الغلاف</h5>
                <ImagePicker setImage={base64 => setthumbnail(base64)} />
            </div>


        </div>
        <div xs={10} className='mx-auto'>
            <h3 className='text-center'>جدول المحتوى</h3>
            <ContentTableEditor pages={pages} editContentTable={setcontent_table} />
        </div>

        <Button className='my-2 d-block me-auto' onClick={submit} variant="success" >
            انشاء الكتاب
        </Button>
    </div>
}