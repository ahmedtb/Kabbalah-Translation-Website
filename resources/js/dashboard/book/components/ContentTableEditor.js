import React from "react";

import { MdSubtitles } from 'react-icons/md'
import { AiFillBook, AiOutlineCloseCircle } from 'react-icons/ai'

import { Dropdown, Form, Col, Button, Container, Row, FormControl } from 'react-bootstrap'

function chapterObject(title, sections) {
    return { type: 'chapter', title: title, sections: sections }
}
function sectionObject(title, page_id) {
    return { type: 'section', title: title, page_id: page_id }
}

function reducer(content_table, action) {

    switch (action.type) {
        case 'set state':
            // console.log('set state', action.state)
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

export default function ContentTableEditor(props) {
    const props_content_table = props.content_table
    const pages = props.pages

    const editContentTable = props.editContentTable
    const [elements, dispatch] = React.useReducer(reducer, [])

    React.useEffect(() => {
        if (props_content_table?.length && !elements?.length) {
            dispatch({ type: 'set state', state: props_content_table })
        } else
            console.log('elements', props_content_table)
    }, [props_content_table])

    React.useEffect(() => {
        editContentTable(elements)
    }, [elements])

    return <div>


        {
            elements.map((element, index) => {
                if (element.type == 'chapter') {
                    // console.log('element.sections', element.sections)
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
                                value={element.title}
                            />
                            <ContentTableEditor
                                pages={pages}
                                editContentTable={(elements) => {
                                    dispatch({type: 'change element', index: index, element: chapterObject(element.title, elements)});

                                }}
                                content_table={element.sections ?? []}
                            />


                        </div>

                    </div>
                } else if (element.type == 'section') {
                    // console.log('section', element)
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
                                }}
                                value={element.title}

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

    </div>
}