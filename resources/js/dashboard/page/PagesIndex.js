import React from 'react'
import PagesTable from '../components/PagesTable'
import { Api } from '../utility/URLs'
import { ApiCallHandler } from '../../commonFiles/helpers'
import { TextFilter } from '../components/Filters'
import Pagination from '../../commonFiles/Pagination'
import { Col } from 'react-bootstrap'
export default function PagesIndex(props) {
    const [pages, setpages] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    function fetchPages(link = null, params = null) {
        ApiCallHandler(
            async () => (link ?
                await axios.get(link, {
                    params: {
                        ...params,
                        // withoutContent: true,
                        with: ['book'], page_size: 10
                    }
                }) :
                await Api.fetchPages({
                    ...params,
                    // withoutContent: true,
                    with: ['book'], page_size: 10
                })
            ),
            (data) => { setpages(data.data); setlinks(data.links ?? []); setparams(params) },
            'PagesIndex fetchPages',
            true
        )
    }
    React.useEffect(() => {
        fetchPages()
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