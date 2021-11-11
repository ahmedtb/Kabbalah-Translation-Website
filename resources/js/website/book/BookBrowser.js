import Button from "@restart/ui/esm/Button"
import React from "react"
import { useParams, useLocation } from "react-router"
import { Link } from 'react-router-dom'
import PageContentRender from '../components/PageContentRender'
import { Routes, Api, ApiCallHandler } from "../utility/Urls"

function getSections(content_table) {
    let sections = []
    for (let i = 0; i < content_table.length; i++) {
        if (content_table[i].sections) {
            if (content_table[i].sections.length)
                sections = sections.concat(content_table[i].sections)
        } else {
            sections = [...sections, content_table[i]]
        }
    }
    return sections
}

export default function BookBrowser(props) {
    const { id, section_id } = useParams()
    const [book, setbook] = React.useState(useLocation().state?.book ?? undefined)
    const [sections, setsections] = React.useState(useLocation().state?.sections ?? [])
    const [sectionIndex, setsectionIndex] = React.useState()

    const [page, setpage] = React.useState()

    function setup() {
        ApiCallHandler(
            async () => await Api.fetchBook(id),
            (data) => { setbook(data) },
            'BookBrowser setup',
            true
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
        else if (book && !sections.length) {
            setsections(getSections(book.content_table))
        } else {
            let index = sections.findIndex(section => section.id == section_id)
            setsectionIndex(index)
            fetchPage(sections[index].page_id)
        }
    }, [book, sections, section_id])

    return <div>
        <PageContentRender page={page} />
        <div className='d-flex flex-row justify-content-around'>
            {
                sections[sectionIndex + 1] ? (
                    <Link
                        to={{
                            pathname: Routes.bookBrowser(id, sections[sectionIndex + 1]?.id),
                            state: { book: book, sections: sections }
                        }}
                    >
                        next
                    </Link>
                ) : null
            }
            {
                sections[sectionIndex - 1] ? (
                    <Link
                        to={{
                            pathname: Routes.bookBrowser(id, sections[sectionIndex - 1]?.id),
                            state: { book: book, sections: sections }
                        }}
                    >
                        previus
                    </Link>
                ) : null
            }
        </div>
    </div >
}