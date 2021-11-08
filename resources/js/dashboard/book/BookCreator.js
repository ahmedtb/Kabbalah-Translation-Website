import React from 'react'
import ChapterCreator from './components/ChapterCreator'
import { ApiCallHandler } from '../utility/helpers'
import axios from 'axios'
import { Dropdown, Button, Col } from 'react-bootstrap'

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

function Section(props) {
    const section = props.section
    return <div>
        <div>{section.title}</div>
        <div>{section.page_id}</div>
    </div>
}

function Sections(props) {
    const sections = props.sections
    return sections.map((section, index) => <div key={index}>
        <Section section={section} />
    </div>)

}

function Chapter(props) {
    const chapter = props.chapter

    return <div key={index}>
        <div>{chapter.title}</div>
        <Sections sections={chapter.sections} />
    </div>
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

export default function BookCreator(props) {
    const [contentTable, dispatch] = React.useReducer(reducer, [])
    const [avaliablepages, setavaliablepages] = React.useState([])

    const [selectedType, setSelectedType] = React.useState();
    const [element, setelement] = React.useState(null);

    function setup() {

        ApiCallHandler(
            async () => await axios.get('/dashboardAPI/books/listOfPages'),
            setavaliablepages,
            'BookCreator',
            true
        )
    }

    React.useEffect(() => {
        setup()
    }, [])
    return (
        <div>
            <input type='text' placeholder='عنوان الكتاب' />
            <input type='text' placeholder='وصف الكتاب' />
            {
                contentTable.map((element, index) => {
                    if (element.type == 'chapter')
                        return <Chapter key={index} chapter={element} />
                    else if (element.type == 'section') {
                        return <Section key={index} section={element} />
                    }
                })
            }


            <Col xs={2} className='mx-auto'>
                <Dropdown onSelect={(e) => setSelectedType(e)}>
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


            {
                (() => {
                    if (selectedType == 'chapter') {
                        // return (
                        //     <ChapterCreator dispatch={setelement} />
                        // )
                        return (
                            <div>
                                <input type='text' placeholder='عنوان الفصل'
                                    onChange={e => setelement(old => chapterObject(e.target.value, old.sections))}
                                />
                                <input type='text' placeholder='عنوان الجزء'
                                    onChange={e => {
                                        newsections = [...element.sections]
                                        newsections[newsections.length - 1].title = e.target.value
                                        setelement(old => chapterObject(element.title, newsections))                                    }}
                                />
                            </div>
                        )
                    } else if (selectedType == 'section') {
                        return (
                            <div>
                                <input type='text' placeholder='عنوان الجزء' />
                            </div>
                        )
                    }
                })()
            }
            <Col xs={1} className='mx-auto'>
                {element ?
                    <Button
                        className='my-2'
                        onClick={() => {
                            dispatch({ type: 'add', element: element })
                            setelement(null)
                            setSelectedType(null)
                        }} variant="primary">اضف</Button>
                    : null}
            </Col>

        </div>
    )
}