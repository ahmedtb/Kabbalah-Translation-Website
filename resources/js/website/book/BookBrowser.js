import Button from "@restart/ui/esm/Button"
import React from "react"
import { useParams, useLocation } from "react-router"
import { Link } from 'react-router-dom'
import PageRender from '../components/PageRender'
import { Routes, Api, ApiCallHandler } from "../utility/Urls"

export default function BookBrowser(props) {
    const { id, section_id } = useParams()
    // let data = useLocation();
    // console.log(data.state)
    const [book, setbook] = React.useState(useLocation().state ?? undefined)
    const [section, setsection] = React.useState()
    const [nextsection, setnextsection] = React.useState()
    const [presection, setpresection] = React.useState()

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
            true
        )
    }

    React.useEffect(() => {
        if (!book)
            setup()
        else
            setSectionFromTable(book.content_table)
    }, [book])

    function setSectionFromTable(content_table) {
        content_table.forEach((element, index) => {
            if (element.sections) {
                element.sections.forEach((section, index) => {
                    if (section.id == section_id) {
                        setsection(section)
                        fetchPage(section.page_id)
                    }

                })
            } else {
                if (element.id == section_id) {
                    setsection(element)
                    fetchPage(element.page_id)
                }

            }
        });
    }


    return <div>
        <PageRender page={page} />
        <Link
            to={{
                pathname: Routes.bookBrowser(id, section_id),
                state: { book: book }
            }}
        >
            next
        </Link>
        <Link
            to={{
                pathname: Routes.bookBrowser(id, section_id),
                state: { book: book }
            }}
        >
            previus
        </Link>
    </div >
}