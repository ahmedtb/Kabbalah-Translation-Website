
import React from 'react'
import { ApiCallHandler } from '../../commonFiles/helpers'
import { Api, Routes } from '../utility/URLs'
import { Dropdown, Form, Col, Button, Container, Row, FormControl } from 'react-bootstrap'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ImagePicker from '../components/ImagePicker'
import { useParams } from "react-router";
import { Redirect } from 'react-router-dom'

function chapterObject(title, sections) {
    return { type: 'chapter', title: title, sections: sections }
}
function sectionObject(title, page_id) {
    return { type: 'section', title: title, page_id: page_id }
}

function reducer(table, action) {

    switch (action.type) {
        case 'set state':
            return action.state
        case 'add element':
            return [...table, action.element]
        case 'change element':
            return table.map((element, index) => {
                if (index == action.index)
                    return action.element

                return element
            })
        case 'remove element':
            return table.filter((element, index) => {
                return index != action.index
            })
        case 'left up element':
            let leftup = [...table]
            if (action.index >= 1)
                [leftup[action.index - 1], leftup[action.index]] = [leftup[action.index], leftup[action.index - 1]]
            return leftup
        case 'left down element':
            let leftdown = [...table]
            if (action.index < leftdown.length - 1)
                [leftdown[action.index + 1], leftdown[action.index]] = [leftdown[action.index], leftdown[action.index + 1]]
            return leftdown
        case 'add chapter section':
            let newsections1 = [...table[action.index].sections, action.section]
            let newtable1 = [...table]
            newtable1[action.index].sections = newsections1
            return newtable1
        case 'change chapter section':
            let newsections2 = [...table[action.index].sections]
            newsections2[action.sectionIndex] = action.section
            let newtable2 = [...table]
            newtable2[action.index].sections = newsections2
            return newtable2
        case 'remove chapter section':
            let newsections3 = [...table[action.index].sections]
                .filter((section, index) => {
                    return index != action.sectionIndex
                })
            let newtable3 = [...table]
            newtable3[action.index].sections = newsections3
            return newtable3
        // console.log('remove chapter section', newsections3)

        default: return table
    }
}

const elementTypes = {
    chapter: 'فصل',
    section: 'عنوان'
}


export default function BookEdit(props) {
    const { id } = useParams()

    const [pages, setpages] = React.useState([])
    const [title, settitle] = React.useState('')
    const [description, setdescription] = React.useState('')
    const [author, setauthor] = React.useState('')
    const [activated, setactivated] = React.useState()

    const [thumbnail, setthumbnail] = React.useState('')
    const [table, dispatch] = React.useReducer(reducer, [])

    function setup() {
        ApiCallHandler(
            async () => await Api.fetchBook(id, {}),
            (data) => {
                settitle(data.title)
                setdescription(data.description)
                setauthor(data.author)
                setactivated(data.activated)
                setthumbnail(data.thumbnail)
                dispatch({ type: 'set state', state: data.table })
            },
            'BookEdit fetchBook',
            true
        )
        ApiCallHandler(
            async () => await Api.fetchPages({ withoutContent: true, withoutPagination: true }),
            setpages,
            'BookEdit fetchPages',
            false
        )
    }
    const [redirect, setredirect] = React.useState()

    function submit() {
        ApiCallHandler(
            async () => await Api.editBook(id, title, description, thumbnail, author, activated, table),
            (data) => { alert(data.success); setredirect(Routes.booksIndex) },
            'BookEdit submit',
            true
        )
    }
    if (redirect)
        return <Redirect to={redirect} />
    React.useEffect(() => {
        setup()
    }, [])

    React.useEffect(() => {
        console.log('BookEdit table', table)
    }, [table])

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
                <Form.Check defaultChecked={activated} type='checkbox' label='تفعيل العرض' onChange={e => setactivated(e.target.value == 'on')} />
            <h5>صورة الغلاف</h5>
            <img src={thumbnail} className='maxWidth100' />
            <ImagePicker setImage={base64 => setthumbnail(base64)} />

        </Col>
        <Col xs={10} className='mx-auto'>
            <h3 className='text-center'>جدول المحتوى</h3>

            {
                table.map((element, index) => {
                    if (element.type == 'chapter')
                        return <div className='border rounded' key={index}>
                            <div className='d-flex flex-row justify-content-end h-100 '>
                                <AiOutlineCloseCircle
                                    onClick={() => { dispatch({ type: 'remove element', index: index }) }}
                                />
                            </div>
                            chapter
                            <div className='d-flex flex-column'>
                                <input type='text' placeholder='عنوان الفصل'
                                    onChange={e => {
                                        dispatch({ type: 'change element', index: index, element: chapterObject(e.target.value, element.sections) })
                                    }}
                                    defaultValue={element.title}

                                />

                                {
                                    element.sections?.map((section, sectionIndex) => <div key={sectionIndex}>
                                        <div className='d-flex flex-row justify-content-end h-100 '>
                                            <AiOutlineCloseCircle
                                                className='my-2'
                                                onClick={() => {
                                                    dispatch({ type: 'remove chapter section', index: index, sectionIndex: sectionIndex })

                                                }}
                                                variant="primary"
                                            />
                                        </div>
                                        <div className='d-flex flex-row justify-content-center '>

                                            <input
                                                type='text'
                                                placeholder='عنوان'
                                                style={{ flexGrow: 1 }}
                                                onChange={e => dispatch({ type: 'change chapter section', index: index, sectionIndex: sectionIndex, section: sectionObject(e.target.value, section.page_id) })}
                                                defaultValue={section.title}

                                            />
                                            <Form.Select
                                                aria-label="Default select example"
                                                onChange={e => dispatch({ type: 'change chapter section', index: index, sectionIndex: sectionIndex, section: sectionObject(section.title, e.target.value) })}
                                                value={section.page_id}

                                            >
                                                <option>اختر صفحة</option>
                                                {
                                                    pages.map((page, pageIndex) => <option key={pageIndex} value={page.id}>{page.title}</option>)
                                                }
                                            </Form.Select>
                                        </div>

                                    </div>)
                                }

                                <Button
                                    className='my-2'
                                    onClick={() => {
                                        dispatch({ type: 'add chapter section', index: index, section: sectionObject('', null) })
                                    }}
                                    variant="secondary"
                                >
                                    اضف عنوان
                                </Button>
                            </div>

                        </div>
                    else if (element.type == 'section') {
                        return <div key={index}>
                            <div className='d-flex flex-row justify-content-end h-100 '>
                                <AiOutlineCloseCircle
                                    onClick={() => { dispatch({ type: 'remove element', index: index }) }}
                                />
                            </div>
                            section
                            <div className='d-flex flex-row justify-content-center '>

                                <input type='text' placeholder='section title' onChange={e => {
                                    dispatch({ type: 'change element', index: index, element: sectionObject(e.target.value, element.page_id) })
                                }}
                                    defaultValue={element.title}
                                />
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={e => {
                                        dispatch({ type: 'change element', index: index, element: sectionObject(element.title, e.target.value) })

                                    }}
                                    value={element.page_id}
                                >
                                    <option>اختر صفحة</option>
                                    {
                                        pages.map((page, pageIndex) => <option key={pageIndex} value={page.id}>{page.title}</option>)
                                    }
                                </Form.Select>
                            </div>
                        </div>
                    }
                })
            }

        </Col>

        <Col xs={2} className='mx-auto'>
            <Dropdown onSelect={(e) => {
                if (e == 'chapter')
                    dispatch({ type: 'add element', element: chapterObject('', []) })
                else if (e == 'section')
                    dispatch({ type: 'add element', element: sectionObject('', '') })

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
            تعديل الكتاب
        </Button>
    </div>
}