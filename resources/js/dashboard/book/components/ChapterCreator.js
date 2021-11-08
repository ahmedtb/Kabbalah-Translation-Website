import React from "react"
import { Dropdown, Button, Col } from 'react-bootstrap'

function chapterObject(title, sections) {
    return { type: 'chapter', title: title, sections: sections }
}
function sectionObject(title, page_id) {
    return { type: 'section', title: title, page_id: page_id }
}
function reducer(sections, action) {
    switch (action.type) {
        case 'add': return [...sections, sectionObject(action.title, action.page_id)]
    }
}

export default function ChapterCreator(props) {
    const dispatch = props.dispatch
    const pages = props.pages
    const [title, settitle] = React.useState('')
    const [sections, sectionsReducer] = React.useReducer(reducer, [])

    return (
        <div>
            <input type='text' placeholder='عنوان الفصل'
                onChange={e => settitle(e.target.value)}
            />
            {
                sections.map((section, index) => <div key={index}>
                    <input type='text' placeholder='عنوان' />
                    <Dropdown onSelect={(e) => setSelectedType(e)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            فصل ام عنوان
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                pages.map((page, index) => {
                                    return <Dropdown.Item
                                        key={index}
                                        eventKey={key} >
                                        {elementTypes[key]}
                                    </Dropdown.Item>
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Select aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </div>)
            }
            <Button
                className='my-2'
                onClick={() => {
                    sectionsReducer({ type: 'add', title: '', page_id: '' })
                }} variant="primary">اضف</Button>
        </div>
    )
}