
import React from 'react'
import { ApiCallHandler } from '../../commonFiles/helpers'
import { Api, Routes } from '../utility/URLs'
import { Dropdown, Form, Col, Button, Container, Row, FormControl } from 'react-bootstrap'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ImagePicker from '../components/ImagePicker'
import { Redirect } from 'react-router'
import { MdSubtitles } from 'react-icons/md'
import { AiFillBook } from 'react-icons/ai'


function chapterObject(title, sections) {
    return { type: 'chapter', title: title, sections: sections }
}
function sectionObject(title, page_id) {
    return { type: 'section', title: title, page_id: page_id }
}

function reducer(content_table, action) {

    switch (action.type) {
        case 'set state':
            return action.state
        case 'add element':
            return [...content_table, action.element]
        case 'change element':
            return content_table.map((element, index) => {
                if (index == action.index)
                    return action.element

                return element
            })
        case 'remove element':
            return content_table.filter((element, index) => {
                return index != action.index
            })
        case 'left up element':
            let leftup = [...content_table]
            if (action.index >= 1)
                [leftup[action.index - 1], leftup[action.index]] = [leftup[action.index], leftup[action.index - 1]]
            return leftup
        case 'left down element':
            let leftdown = [...content_table]
            if (action.index < leftdown.length - 1)
                [leftdown[action.index + 1], leftdown[action.index]] = [leftdown[action.index], leftdown[action.index + 1]]
            return leftdown
        case 'add chapter section':
            let newsections1 = [...content_table[action.index].sections, action.section]
            let newtable1 = [...content_table]
            newtable1[action.index].sections = newsections1
            return newtable1
        case 'change chapter section':
            let newsections2 = [...content_table[action.index].sections]
            newsections2[action.sectionIndex] = action.section
            let newtable2 = [...content_table]
            newtable2[action.index].sections = newsections2
            return newtable2
        case 'remove chapter section':
            let newsections3 = [...content_table[action.index].sections]
                .filter((section, index) => {
                    return index != action.sectionIndex
                })
            let newtable3 = [...content_table]
            newtable3[action.index].sections = newsections3
            return newtable3
        // console.log('remove chapter section', newsections3)

        default: return content_table
    }
}

const elementTypes = {
    chapter: <div>
        <AiFillBook />
        فصل
    </div>,
    section: <div>
        <MdSubtitles />
        عنوان
    </div>
}


export default function BookCreator(props) {
    const [pages, setpages] = React.useState([])
    const [title, settitle] = React.useState('')
    const [description, setdescription] = React.useState('')
    const [author, setauthor] = React.useState('')
    const [activated, setactivated] = React.useState(false)

    const [thumbnail, setthumbnail] = React.useState('')
    const [content_table, dispatch] = React.useReducer(reducer, [])

    const [redirect, setredirect] = React.useState()

    function setup() {

        ApiCallHandler(
            async () => await Api.fetchPages({
                // withoutContent: true, 
                withoutPagination: true
            }),
            setpages,
            'BookCreator2 setup',
            false
        )
    }
    function submit() {
        ApiCallHandler(
            async () => await Api.createBook(title, description, thumbnail, author, activated, content_table),
            (data) => { alert(data['success']); setredirect(Routes.booksIndex()) },
            'BookCreator2 submit',
            true
        )
    }

    React.useEffect(() => {
        setup()
    }, [])

    React.useEffect(() => {
        console.log('BookCreator2 content_table', content_table)
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

            {
                content_table.map((element, index) => {
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
                                            />
                                            <Form.Select
                                                aria-label="Default select example"
                                                onChange={e => dispatch({ type: 'change chapter section', index: index, sectionIndex: sectionIndex, section: sectionObject(section.title, e.target.value) })}
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

                                <input type='text' placeholder='section title'
                                    onChange={e => {
                                        dispatch({ type: 'change element', index: index, element: sectionObject(e.target.value, element.page_id) })
                                    }} />
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={e => {
                                        dispatch({ type: 'change element', index: index, element: sectionObject(element.title, e.target.value) })

                                    }}
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
            انشاء الكتاب
        </Button>
    </div>
}