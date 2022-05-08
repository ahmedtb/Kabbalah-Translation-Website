import React from "react"
import { useParams, useLocation } from "react-router"
import { Link } from 'react-router-dom'
import PageContentRender from '../components/PageContentRender'
import { Routes, Api, ApiCallHandler } from "../utility/Urls"
import {
    getsectionsarray,
    getelement,
    getnextsection,
    getpresection,
} from './components/TableFunctions';
import { truncate } from '../../commonFiles/helpers'
import { Helmet } from 'react-helmet'
import LoadingIndicator from '../../commonFiles/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker'
import PagePathRender from "./components/PagePathRender"


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
        trackPromise(
            ApiCallHandler(
                async () => await Api.fetchPage(page_id),
                setpage,
                'BookBrowser fetchPage',
                false
            )
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

        <Helmet>
            <title>{page?.title}</title>
        </Helmet>

        <div className='rounded'>

            <PagePathRender book={book} path={sectionPath} />

            <PageContentRender page_content={page?.page_content} />
            <LoadingIndicator />
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
        {page?.source_url ? <div>رابط المصدر <a href={page?.source_url} target='_blank'>{truncate(page?.source_url, 20)}</a></div> : null}

    </div >
}