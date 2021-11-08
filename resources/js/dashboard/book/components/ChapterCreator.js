import React from "react"
import { Dropdown, Button, Form } from 'react-bootstrap'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function chapterObject(title, sections) {
    return { type: 'chapter', title: title, sections: sections }
}
function sectionObject(title, page_id) {
    return { type: 'section', title: title, page_id: page_id }
}
function reducer(sections, action) {
    switch (action.type) {
        case 'add':
            return [...sections, sectionObject('', '')]
        case 'remove':
            return sections.filter((value, index) => {
                return index != action.index;
            });
        case 'edit':
            return sections.map((section, index) => {
                if (index == action.index) {
                    return action.section
                }
                return section
            })

    }
}

export default function ChapterCreator(props) {
    const dispatch = props.dispatch
    const pages = props.pages
    const [title, settitle] = React.useState('')
    const [sections, sectionsDispatch] = React.useReducer(reducer, [])

    React.useEffect(() => {
        dispatch(chapterObject(title, sections))
    }, [sections, title])

    return (
        <div className='d-flex flex-column'>
            <input type='text' placeholder='عنوان الفصل'
                onChange={e => {
                    settitle(e.target.value)
                }}
            />

            {
                sections.map((section, index) => <div key={index}>
                    <div className='d-flex flex-row justify-content-end h-100 '>
                        <AiOutlineCloseCircle
                            className='my-2'
                            onClick={() => {
                                sectionsDispatch({ type: 'remove', index: index })
                            }}
                            variant="primary"
                        />
                    </div>
                    <div className='d-flex flex-row justify-content-center '>

                        <input
                            type='text'
                            placeholder='عنوان'
                            style={{flexGrow:1}}
                            onChange={e => sectionsDispatch({ type: 'edit', index: index, section: sectionObject(e.target.value, section.page_id) })}
                        />
                        <Form.Select
                            aria-label="Default select example"
                            onChange={e => sectionsDispatch({ type: 'edit', index: index, section: sectionObject(section.title, e.target.value) })}
                        >
                            <option>اختر صفحة</option>
                            {
                                pages.map((page, index) => <option key={index} value={page.id}>{page.title}</option>)
                            }
                        </Form.Select>
                    </div>

                </div>)
            }

            <Button
                className='my-2'
                onClick={() => {
                    sectionsDispatch({ type: 'add' })
                }}
                variant="secondary"
            >
                اضف عنوان
            </Button>
        </div>
    )
}