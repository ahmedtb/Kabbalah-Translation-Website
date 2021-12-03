import React from "react"
import { useParams, useLocation } from "react-router"
import { Link } from 'react-router-dom'
import PageContentRender from '../components/PageContentRender'
import { Routes, Api, ApiCallHandler } from "../utility/Urls"
import {
    getsectionsarray,
    getelement,
    getnextsection,
    getpresection
} from "./Table"


export default function BookBrowser(props) {
    const { id, sectionPath } = useParams()
    const [book, setbook] = React.useState(useLocation().state?.book ?? undefined)

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
        else {
            console.log('getsectionsarray', getsectionsarray(book.content_table))

            console.log('getelement', getelement(book.content_table, sectionPath))
            console.log('getnextsection', getnextsection(book.content_table, sectionPath))
            console.log('getpresection', getpresection(book.content_table, sectionPath))

            fetchPage(getelement(book.content_table, sectionPath).page_id)
        }
    }, [book, sectionPath])


    return <div>
        {/* <div className='d-flex'>
            <Link to={Routes.bookShow(id)}>
                {book?.title}
            </Link>
            -
            {
                sections[sectionIndex]?.subIndex ?
                    <div><Link to={Routes.bookChapterShow(book?.id, sections[sectionIndex].index)}>{book?.content_table[sections[sectionIndex].index].title}</Link> - {sections[sectionIndex]?.title}</div>
                    : <div >{sections[sectionIndex]?.title}</div>
            }
        </div> */}
        <div className='rounded'>
            <PageContentRender page_content={page?.page_content} />
        </div>
        <div className='d-flex flex-row justify-content-around'>
        {
                getpresection(book?.content_table, sectionPath) ? (
                    <Link
                        to={{
                            pathname: Routes.bookBrowser(id, getpresection(book?.content_table, sectionPath)?.path),
                            state: { book: book }
                        }}
                    >
                        السابق
                    </Link>
                ) : null
            }

            {
                getnextsection(book?.content_table, sectionPath) ? (
                    <Link
                        to={{
                            pathname: Routes.bookBrowser(id, getnextsection(book?.content_table, sectionPath)?.path),
                            state: { book: book }
                        }}
                    >
                        التالي
                    </Link>
                ) : null
            }
            
        </div>
        {page?.source_url ? <div>عنوان المصدر <a href={page?.source_url} target='_blank'>{page?.source_url}</a></div> : null }

    </div >
}