import React from "react"
import { useParams, useLocation } from "react-router"
import { Link } from 'react-router-dom'
import { Routes, Api, ApiCallHandler } from "../utility/Urls"
import { getsectionIndex } from "./Table"
import { ListGroup } from "react-bootstrap"
export default function BookChapter(props) {
    const { id, chapterIndex } = useParams()
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
            // console.log('chapter sections', book.content_table[chapterIndex].sections)
        }
    }, [book, chapterIndex])

    return <div>
        <h1 className='text-center'>{book?.content_table[chapterIndex].title}</h1>
        {
            book?.content_table[chapterIndex].sections.map((element, sectionIndex) => <ListGroup.Item key={sectionIndex} as="li">
                <Link to={Routes.bookBrowser(id, getsectionIndex(book.content_table, chapterIndex, sectionIndex))}>
                    {element.title}
                </Link>
            </ListGroup.Item>)
        }
    </div>
}