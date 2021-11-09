import React from 'react'
import ChapterCreator from './components/ChapterCreator'
import { ApiCallHandler } from '../utility/helpers'
import ApiEndpoints from '../utility/ApiEndpoints'
import axios from 'axios'
import { Dropdown, Form, Col, Button, Container, Row, FormControl } from 'react-bootstrap'
import { AiOutlineCloseCircle } from 'react-icons/ai'
function reducer(contentTable, action) {

    switch (action.type) {
        case 'add':
            return [...contentTable, action.element]
        case 'edit':
            return contentTable.map((element, index) => {
                if (index == action.index)
                    return action.element
                return element
            })
        case 'remove':
            return contentTable.filter((element, index) => {
                return index != action.index
            })
        case 'left up element':
            let leftup = [...contentTable]
            if (action.index >= 1)
                [leftup[action.index - 1], leftup[action.index]] = [leftup[action.index], leftup[action.index - 1]]
            return leftup
        case 'left down component':
            let leftdown = [...contentTable]
            if (action.index < leftdown.length - 1)
                [leftdown[action.index + 1], leftdown[action.index]] = [leftdown[action.index], leftdown[action.index + 1]]
            return leftdown

        default: return contentTable
    }
}

const elementTypes = {
    chapter: 'فصل',
    section: 'عنوان'

}
function chapterObject(title, sections) {
    return { type: 'chapter', title: title, sections: sections }
}
function sectionObject(title, page_id) {
    return { type: 'section', title: title, page_id: page_id }
}

function SectionCreator(props) {
    const pages = props.pages
    const dispatch = props.dispatch

    const [title, setitle] = React.useState('')
    const [page_id, sepage_id] = React.useState('')

    return <div className='d-flex flex-row justify-content-center '>

        <input type='text' placeholder='section title' onChange={e => {
            setitle(e.target.value)
            dispatch(sectionObject(e.target.value, page_id))
        }} />
        <Form.Select
            aria-label="Default select example"
            onChange={e => {
                sepage_id(e.target.value)
                dispatch(sectionObject(title, e.target.value))
            }}
        >
            <option>اختر صفحة</option>
            {
                pages.map((page, index) => <option key={index} value={page.id}>{page.title}</option>)
            }
        </Form.Select>
    </div>
}

export default function BookCreator(props) {
    const [contentTable, dispatch] = React.useReducer(reducer, [])
    const [avaliablepages, setavaliablepages] = React.useState([])
    const [bookTitle, setbookTitle] = React.useState('')
    const [bookDescription, setbookDescription] = React.useState('')

    function setup() {

        ApiCallHandler(
            async () => await ApiEndpoints.fetchPages({ exclude: ['page_content'] }),
            setavaliablepages,
            'BookCreator setup',
            true
        )
    }
    function submit() {
        ApiCallHandler(
            async () => await ApiEndpoints.createBook(bookTitle, bookDescription, contentTable),
            null,
            'BookCreator submit',
            true
        )
    }
    // React.useEffect(() => {
    //     console.log('BookCreator contentTable', contentTable)
    // }, [contentTable])

    React.useEffect(() => {
        setup()
    }, [])
    return (
        <Container >
            <Col xs={12}>
                <Col xs={12} >
                    <Row>
                        <Form.Control as='input' type='text' placeholder='عنوان الكتاب' onChange={e => setbookTitle(e.target.value)} />
                    </Row>
                    <Row>
                        <Form.Control as='textarea' type='text' placeholder='وصف الكتاب' onChange={e => setbookDescription(e.target.value)} />
                    </Row>

                </Col>
                <Col xs={10} className='mx-auto'>
                    <h3 className='text-center'>جدول المحتوى</h3>

                    {
                        contentTable.map((element, index) => {
                            if (element.type == 'chapter')
                                return <div className='border rounded' key={index}>
                                    <div className='d-flex flex-row justify-content-end h-100 '>
                                        <AiOutlineCloseCircle
                                            onClick={() => { dispatch({ type: 'remove', index: index }) }}
                                        />
                                    </div>
                                    <ChapterCreator pages={avaliablepages} dispatch={chapter => dispatch({ type: 'edit', index: index, element: chapter })} />
                                </div>
                            else if (element.type == 'section') {
                                return <div key={index}>
                                    <div className='d-flex flex-row justify-content-end h-100 '>
                                        <AiOutlineCloseCircle
                                            onClick={() => { dispatch({ type: 'remove', index: index }) }}
                                        />
                                    </div>
                                    <SectionCreator key={index} pages={avaliablepages} dispatch={chapter => dispatch({ type: 'edit', index: index, element: chapter })} />
                                </div>
                            }
                        })
                    }

                </Col>

                <Col xs={2} className='mx-auto'>
                    <Dropdown onSelect={(e) => {
                        if (e == 'chapter')
                            dispatch({ type: 'add', element: chapterObject('', []) })
                        else if (e == 'section')
                            dispatch({ type: 'add', element: sectionObject('', '') })

                    }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            فصل ام عنوان
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                Object.keys(elementTypes).map(function (key, index) {
                                    return <Dropdown.Item
                                        key={index}
                                        eventKey={key} >
                                        {elementTypes[key]}
                                    </Dropdown.Item>
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Button className='my-2' onClick={submit} variant="secondary" >
                    انشاء الكتاب
                </Button>
            </Col>
        </Container >
    )
}