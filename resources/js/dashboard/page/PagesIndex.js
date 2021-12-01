import React from 'react'
import PagesTable from '../components/PagesTable'
import { Api } from '../utility/URLs'
import { ApiCallHandler } from '../../commonFiles/helpers'
import { SelectFilter, TextFilter } from '../components/Filters'
import Pagination from '../../commonFiles/Pagination'
import { Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import ChangePageTitle from "../../commonFiles/ChangePageTitle";


export default function PagesIndex(props) {
    const history = useHistory()


    const [pages, setpages] = React.useState([])
    const [links, setlinks] = React.useState([])

    function fetchPages(link = null, params = null) {
        let linkParams = Object.fromEntries(new URLSearchParams(link?.split('?')[1]))
        let allParams = { with: 'book', page_size: 10, ...linkParams, ...params }
        ApiCallHandler(
            async () => await Api.fetchPages(allParams),
            (data) => { setpages(data.data); setlinks(data.links ?? []); },
            'PagesIndex fetchPages',
            true
        )
        console.log('all params', allParams)
        history.replace({
            pathname: window.location.pathname,
            search: (new URLSearchParams(allParams)).toString()
        })
    }
    const [books, setbooks] = React.useState([])

    function fetchBooks() {
        ApiCallHandler(
            async () => await Api.fetchBooks({ withoutPagination: true }),
            (data) => { setbooks(data); },
            'PagesIndex fetchBooks',
            true
        )
    }
    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));
        fetchPages(null, params)
        fetchBooks()
    }, [])

    function deletePage(id) {
        ApiCallHandler(async () => await Api.deletePage(id),
            (data) => fetchPages(),
            'PagesIndex deletePage',
            true
        )
    }
    return (
        <div>
            <ChangePageTitle pageTitle={'قائمة الصفحات'} />

            <TextFilter
                fetchPage={(newparams) => fetchPages(null, newparams)}
                property={'title'}
                label={'عنوان الصفحة'}
            />
            {/* <TextFilter
                fetchPage={(newparams) => fetchPages(null, newparams)}
                property={'book_title'}
                label={'عنوان الكتاب'}
            /> */}
            <SelectFilter
                options={books}
                const fetchPage={(params) => fetchPages(null, params)}
                const property={'book_id'}
                const label={'احتر كتاب'}
                const defaultValue={null}
                const valueKeyWord={'id'}
                const nameKeyWord={'title'}
            />
            <Col xs={12}>
                <PagesTable pages={pages} deletePage={deletePage} />
            </Col>
            <Pagination fetchPage={fetchPages} links={links} />
        </div>
    )
}