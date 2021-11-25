import React from 'react'
import PagesTable from '../components/PagesTable'
import { Api } from '../utility/URLs'
import { ApiCallHandler } from '../../commonFiles/helpers'
import { TextFilter } from '../components/Filters'
import Pagination from '../../commonFiles/Pagination'
import { Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import ChangePageTitle from "../../commonFiles/ChangePageTitle";


export default function PagesIndex(props) {
    const history = useHistory()


    const [pages, setpages] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    function fetchPages(link = null, params = null) {
        let linkParams = Object.fromEntries(new URLSearchParams(link?.split('?')[1]))
        // console.log('linkParams', linkParams)

        ApiCallHandler(
            async () => (
                await Api.fetchPages({
                    // withoutContent: true,
                    with: ['book'], page_size: 10, ...params, ...linkParams
                })
            ),
            (data) => {
                setpages(data.data); setlinks(data.links ?? []);
                setparams({
                    with: ['book'], page_size: 10, ...params, ...linkParams
                })
            },
            'PagesIndex fetchPages',
            true
        )
        history.replace({
            pathname: window.location.pathname,
            search: (new URLSearchParams({ with: ['book'], page_size: 10, ...params, ...linkParams })).toString()
        })
    }
    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));

        fetchPages(null, params)
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
                params={params}
                fetchPage={(newparams) => fetchPages(null, newparams)}
                property={'title'}
                label={'عنوان الصفحة'}
            />
            <TextFilter
                params={params}
                fetchPage={(newparams) => fetchPages(null, newparams)}
                property={'book_title'}
                label={'عنوان الكتاب'}
            />
            <Col xs={12}>
                <PagesTable pages={pages} deletePage={deletePage} />
            </Col>
            <Pagination fetchPage={fetchPages} links={links} />
        </div>
    )
}