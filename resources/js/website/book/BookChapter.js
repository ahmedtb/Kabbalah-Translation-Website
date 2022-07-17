import React from "react"
import { useParams, useLocation } from "react-router"
import { Link } from 'react-router-dom'
import { Routes, Api, ApiCallHandler } from "../utility/Urls"
import { getchapter } from "./components/TableFunctions"
import { ListGroup } from "react-bootstrap"
import ChapterPathRender from './components/ChapterPathRender';
import Helmet from "react-helmet"

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

        return <div numbered className='py-1 m-0'>
            <Link to={Routes.bookChapterShow(id, path)} className='fw-bold'>{chapter?.title}</Link>
            <div className='pe-2'>

                {
                    chapter?.sections?.map((element, index) => {
                        if (element.type == 'section')
                            return <Section path={`${path}-${index}`} key={index} section={element} />

                        else if (element.type == 'chapter')
                            return <Chapter path={`${path}-${index}`} key={index} chapter={element} />
                    })
                }
            </div>
        </div>
    }
    function Section(props) {
        const section = props.section
        const path = props.path
        console.log('section path', path)
        return <div>
            <Link to={Routes.bookBrowser(id, path)}>
                {section.title}
            </Link>
        </div>
    }


    return <div>

        <Helmet>
            <title>{getchapter(book?.content_table, chapterPath)?.title}</title>
        </Helmet>
        <ChapterPathRender book={book} path={chapterPath} />

        <h3 className='text-center'>{getchapter(book?.content_table, chapterPath)?.title}</h3>
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