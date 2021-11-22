import React from "react"
import { useParams, useLocation } from "react-router"
import { Link } from 'react-router-dom'
import { Routes, Api, ApiCallHandler } from "../utility/Urls"
import { getchapter } from "./Table"

import { ListGroup } from "react-bootstrap"
export default function BookChapter(props) {
    const { id, chapterPath } = useParams()
    const [book, setbook] = React.useState(useLocation().state?.book ?? undefined)

    function setup() {
        ApiCallHandler(
            async () => await Api.fetchBook(id),
            (data) => { setbook(data) },
            'BookBrowser setup',
            false
        )
    }

    React.useEffect(() => {
        if (!book)
            setup()
        else {
            console.log('book chapter chapterPath', chapterPath)

            console.log('book chapter getchapter', getchapter(book?.content_table, chapterPath))
        }
    }, [book, chapterPath])
    function Chapter(props) {
        const chapter = props.chapter
        const path = props.path

        return <ListGroup as="li" >
            <div>
                <Link to={Routes.bookChapterShow(id, path)}>
                    {chapter?.title}
                </Link>
            </div>
        </ListGroup>
    }
    function Section(props) {
        const section = props.section
        const path = props.path

        return <ListGroup.Item as="li">
            <Link to={Routes.bookBrowser(id, path)}>
                {section.title}
            </Link>
        </ListGroup.Item>
    }


    return <div>
        <h1 className='text-center'>{getchapter(book?.content_table, chapterPath)?.title}</h1>
        <ListGroup as="ol" numbered>
            {
                getchapter(book?.content_table, chapterPath)?.sections.map((element, index) => {
                    if (element.type == 'chapter')
                        return <Chapter path={`${chapterPath}-${index}`} chapter={element} key={index} />
                    else
                        return <Section path={`${chapterPath}-${index}`} section={element} key={index} />

                })

            }
        </ListGroup>

    </div>
}