import React from 'react'
import PagesTable from '../components/PagesTable'
import { Api } from '../utility/URLs'
import { ApiCallHandler } from '../../commonFiles/helpers'
import { SelectFilter, TextFilter } from '../components/Filters'

import { Col } from 'react-bootstrap'
import ChangePageTitle from "../../commonFiles/ChangePageTitle";
import Paginator from '../../commonFiles/Paginator'


export default function PagesIndex(props) {
    // const history = useHistory()


    const [pagesPagination, setpagesPagination] = React.useState([])

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
        // var params = Object.fromEntries(new URLSearchParams(location.search));
        // fetchPages(null, params)
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
                fetchPage={(newparams) => Api.fetchPages(newparams)}
                property={'title'}
                label={'عنوان الصفحة'}
            />
            <SelectFilter
                options={books}
                fetchPage={(params) => Api.fetchPages(params)}
                property={'book_id'}
                label={'احتر كتاب'}
                defaultValue={null}
                valueKeyWord={'id'}
                nameKeyWord={'title'}
            />
            <Col xs={12}>
                <PagesTable pages={pagesPagination?.data} deletePage={deletePage} />
            </Col>

            <Paginator apiCall={Api.fetchPages} useState={[pagesPagination, setpagesPagination]} />

        </div>
    )
}