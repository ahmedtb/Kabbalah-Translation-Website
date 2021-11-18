import React from "react"
import { useParams, useLocation } from "react-router"
import { Link } from 'react-router-dom'
import PageContentRender from '../components/PageContentRender'
import { Routes, Api, ApiCallHandler } from "../utility/Urls"
import {
    getsectionsarray,
    getsectionIndex
} from "./Table"


export default function BookBrowser(props) {
    const { id, sectionIndex } = useParams()
    const [book, setbook] = React.useState(useLocation().state?.book ?? undefined)
    const [sections, setsections] = React.useState([])

    const [page, setpage] = React.useState()

    function setup() {
        ApiCallHandler(
            async () => await Api.fetchBook(id),
            (data) => { setbook(data) },
            'BookBrowser setup',
            false
        )
    }
    function fetchPage(page_id) {
        ApiCallHandler(
            async () => await Api.fetchPage(page_id),
            setpage,
            'BookBrowser fetchPage',
            false
        )
    }

    React.useEffect(() => {
        if (!book)
            setup()
        else if (!sections.length) {
            setsections(getsectionsarray(book.content_table))
            // console.log('getsectionsarray', getsectionsarray(book.content_table))
        } else {
            // console.log('sectionIndex', sectionIndex)
            // console.log('sections[sectionIndex]', sections[sectionIndex])
            // console.log('sections[sectionIndex + 1]', sections[+sectionIndex + 1])
            fetchPage(sections[sectionIndex].page_id)
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' })
            }, 0)
        }
    }, [book, sections, sectionIndex])


    return <div>
        <div className='d-flex'>
            <Link to={Routes.bookShow(id)}>
                {book?.title}
            </Link>
            -
            {
                sections[sectionIndex]?.subIndex ?
                    <div><Link to={Routes.bookChapterShow(book?.id, sections[sectionIndex].index)}>{book?.content_table[sections[sectionIndex].index].title}</Link> - {sections[sectionIndex]?.title}</div>
                    : <div >{sections[sectionIndex]?.title}</div>
            }


        </div>
        <div className='bg-white rounded'>
            <PageContentRender page={page} />

        </div>
        <div className='d-flex flex-row justify-content-around'>
            {
                sections[+sectionIndex + 1] ? (
                    <Link
                        to={{
                            pathname: Routes.bookBrowser(id, +sectionIndex + 1),
                            state: { book: book }
                        }}
                    >
                        التالي
                    </Link>
                ) : null
            }
            {
                sections[+sectionIndex - 1] ? (
                    <Link
                        to={{
                            pathname: Routes.bookBrowser(id, +sectionIndex - 1),
                            state: { book: book }
                        }}
                    >
                        السابق
                    </Link>
                ) : null
            }
        </div>
    </div >
}